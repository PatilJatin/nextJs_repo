import { connectDb } from "@/dbConfig/dbConfig";
import { Project } from "@/models/project-model";
import { FAQ } from "@/models/faq-model";
import { headers } from "next/headers";

import { Admin } from "@/models/admin-model";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import moment from "moment";
import { AWS } from "@/app/api/v1/aws/aws.helper";
import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { createProjectZodSchema } from "@/app/lib/zodValidations/projects/createProject";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/app/utils/api-error";
import juice from "juice";
import { getFormattedEmailContent } from "@/helpers/projects.helper/getFormattedEmailContentToNotifyPeople";
import { SubscribedUsers } from "@/models/subscribedUsers.model";
connectDb();

// Defining an interface for the FAQ object
interface FAQInterface {
  question: string;
  answer: string;
}

const { SOURCE_EMAIL = "aman.maddhesia@furation.tech" } = process.env;
// ============Method to create a project in the database(token required)
export const POST = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const payload: any = await getPayloadFromTokenAfterVerification();
  const adminFound = await Admin.findOne({ firebaseId: payload.uid });
  if (!adminFound) {
    throw new ApiError(
      "No admin found with the provided token",
      StatusCodes.BAD_REQUEST
    );
  }

  const reqBody = await req.json();
  const parsedReqBody = createProjectZodSchema.parse(reqBody);
  // ============New logic for isLaunchedRecently and isUpcomingProject
  let isLaunchedRecently, isUpcomingProject;
  const releaseDateMoment = moment(parsedReqBody.releaseDate);
  const currentTimestamp = moment();
  const oneMonthAgo = moment().subtract(1, "months");
  if (releaseDateMoment > currentTimestamp) {
    isUpcomingProject = true;
    isLaunchedRecently = false;
  } else if (
    releaseDateMoment <= currentTimestamp &&
    releaseDateMoment > oneMonthAgo
  ) {
    isUpcomingProject = false;
    isLaunchedRecently = true;
  }

  // ==========New logic for closingIn stuff
  const occupancyDateMoment = moment(parsedReqBody.occupancyDate);
  // const currentTimestamp = moment();   // commenting this because currentTimestamp already there above

  if (occupancyDateMoment < currentTimestamp) {
    throw new ApiError(
      "Occupancy date should be of future date",
      StatusCodes.BAD_REQUEST
    );
  }
  const monthsDifference = occupancyDateMoment.diff(currentTimestamp, "months");

  let closingIn;

  if (monthsDifference >= 0 && monthsDifference < 12) {
    closingIn = 12;
  } else if (monthsDifference >= 12 && monthsDifference < 24) {
    closingIn = 1;
  } else if (monthsDifference >= 24 && monthsDifference < 36) {
    closingIn = 2;
  } else if (monthsDifference >= 36 && monthsDifference < 48) {
    closingIn = 3;
  } else if (monthsDifference >= 48 && monthsDifference < 60) {
    closingIn = 4;
  } else if (monthsDifference >= 60 && monthsDifference < 72) {
    closingIn = 5;
  } else {
    closingIn = 6;
  }

  const newProject = new Project({
    ...parsedReqBody,
    closingIn,
    uploadedByAdmin: adminFound.id,
    isUpcomingProject,
    isLaunchedRecently,
  });

  const savedProject = await newProject.save();
  adminFound.projects.push(savedProject._id);
  await adminFound.save();

  // ===================Below is the code to send email to the subscribed users
  const emailBody = getFormattedEmailContent(savedProject);

  // Inline CSS styles into HTML elements
  const inlinedEmailBody = juice(emailBody);

  const subscribedUsers = await SubscribedUsers.findOne({}).select("users");

  console.log("Subscribed users@@@@@@@", subscribedUsers.users);
  const mailOptions = {
    Source: SOURCE_EMAIL!,
    Destination: { ToAddresses: subscribedUsers.users },
    Message: {
      Subject: { Data: "New Condo Listed" },
      Body: {
        Html: {
          Data: inlinedEmailBody,
        },
      },
    },
  };

  // ================Creating SES object
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const returnedData = await ses.sendEmail(mailOptions).promise();

  return ApiResponse(
    "new project created successfully",
    StatusCodes.CREATED,
    savedProject
  );
});

// ================This is the method to find all the projects with pagination
export const GET = asyncHandler(async function (req: NextRequest) {
  console.log("@@@@@@@@@");
  const headersList = headers();

  let authorization = headersList.get("authorization");
  let token = authorization?.split(" ")[1];
  if (token) {
    const payload: any = await getPayloadFromTokenAfterVerification();
    const adminFound = await Admin.findOne({ firebaseId: payload.uid });
    if (!adminFound) {
      throw new ApiError(
        "No admin found with the provided token",
        StatusCodes.BAD_REQUEST
      );
    }
  }
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page")!) || 1;
  const limit = parseInt(searchParams.get("limit")!) || 10;
  const location = searchParams.get("location");
  const developer = searchParams.get("developer");
  const occupancyYear = searchParams.get("occupancyYear");
  const deposit = searchParams.get("deposit");
  const globalSearch = searchParams.get("global-search");

  const queryParams = [
    { key: "city", value: location },
    { key: "developerName", value: developer },
    { key: "occupancyDate", value: occupancyYear },
    { key: "deposit", value: deposit },
  ];

  let filter: any;
  if (!token) {
    filter = { isHidden: false };
  }

  queryParams.forEach((param) => {
    if (param.value) {
      if (param.key === "occupancyDate") {
        // Construct a regex pattern to match any date within the specified year
        const regexPattern = new RegExp(`^${param.value}-`);
        filter["occupancyDate"] = { $regex: regexPattern };
      } else if (param.key === "developerName" || param.key === "city") {
        const nameRegex = new RegExp(param.value, "i");
        filter[param.key] = nameRegex;
      } else {
        filter[param.key] = param.value;
      }
    }
  });

  if (globalSearch) {
    const globalSearchRegex = new RegExp(globalSearch, "i"); // Case-insensitive search
    filter["$or"] = [
      { name: { $regex: globalSearchRegex } }, // Search by condo name
      { city: { $regex: globalSearchRegex } }, // Search by location
      { developerName: { $regex: globalSearchRegex } }, // Search by developer name
    ];
  }

  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;
  // console.log("@@@@@filter is ", filter);
  const projects = await Project.find(filter).skip(skip).limit(limit);

  const totalProjectsCount = await Project.countDocuments(filter);

  const totalPages = Math.ceil(totalProjectsCount / limit);

  // =============Finding distinct filters
  const fourFilters = await Project.aggregate([
    {
      $group: {
        _id: null,
        location: { $addToSet: { $toLower: "$city" } },
        developers: { $addToSet: { $toLower: "$developerName" } },
        occupancyYears: { $addToSet: { $year: { $toDate: "$occupancyDate" } } },
        deposits: { $addToSet: "$deposit" },
      },
    },
  ]);

  //===========sorting the filters received above
  fourFilters[0].location.sort();
  fourFilters[0].developers.sort();
  fourFilters[0].occupancyYears.sort((a: any, b: any) => a - b);
  fourFilters[0].deposits.sort((a: any, b: any) => a - b);
  // ============Returning all fetch projects as a response
  return ApiResponse(
    "All projects fetched successfully with pagination",
    StatusCodes.OK,
    {
      totalProjectsCount,
      totalPages,
      currentPage: page,
      limit,
      projects,
      fourFilters,
    }
  );
});
