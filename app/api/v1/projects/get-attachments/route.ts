import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";
import { AWS } from "@/app/api/v1/aws/aws.helper";
import { ApiError } from "@/app/utils/api-error";
import { connectDb } from "@/dbConfig/dbConfig";
import { userInfoZodSchema } from "@/app/lib/zodValidations/projects/userInfo";
import { Project } from "@/models/project-model";
import mongoose from "mongoose";
import { getFormattedEmailContent } from "@/helpers/projects.helper/getFormattedEmailContent";
import juice from "juice";

connectDb();
// ==============extracting environment variables
const {
  ACCESS_KEY,
  SECRET_KEY,
  REGION,
  BUCKET_NAME,
  SOURCE_EMAIL,
  DESTINATION_EMAIL,
  JWT_SECRET,
} = process.env;

export const POST = asyncHandler(async function (req: NextRequest) {
  console.log("Inside get attachments ");
  const reqBody = await req.json();
  const parsedReqBody = userInfoZodSchema.parse(reqBody);

  if (!mongoose.Types.ObjectId.isValid(parsedReqBody.projectId)) {
    throw new ApiError("Invalid project id provided", StatusCodes.BAD_REQUEST);
  }
  const projectFoundInDB = await Project.findOne({
    _id: parsedReqBody.projectId,
  }).select({
    name: 1,
    attachments: {
      $map: {
        input: "$attachments",
        in: {
          title: "$$this.title",
          location: "$$this.location",
          _id: 0, // Exclude the _id field
        },
      },
    },
  });
  if (!projectFoundInDB) {
    throw new ApiError(`Project do not exist in DB`, StatusCodes.BAD_REQUEST);
  }
  // console.log("@@@@@@@@@@", projectFoundInDB);
  const formattedEmail = getFormattedEmailContent(
    projectFoundInDB,
    parsedReqBody
  );
  // Inline CSS styles into HTML elements
  const inlinedEmailBody = juice(formattedEmail);
  const mailOptions = {
    Source: SOURCE_EMAIL!, //=================It is there in .env
    Destination: { ToAddresses: [parsedReqBody.email] }, //=====Should be a verified email till the time of production
    Message: {
      Subject: { Data: "Condo Attachments" },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: inlinedEmailBody,
        },
      },
    },
  };

  // ================Creating SES object
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const returnedData = await ses.sendEmail(mailOptions).promise();

  return ApiResponse(
    `attachments sent to ${parsedReqBody.email}`,
    StatusCodes.OK,
    returnedData
  );
});
