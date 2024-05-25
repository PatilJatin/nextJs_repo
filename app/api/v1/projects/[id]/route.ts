import { connectDb } from "@/dbConfig/dbConfig";
import { Project } from "@/models/project-model";
import { AuditLog } from "@/models/audit-log";
import { FAQ } from "@/models/faq-model";
import { Admin } from "@/models/admin-model";
import mongoose from "mongoose";
import { headers } from "next/headers";

import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";

import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/app/utils/api-error";
import { updateProjectZodSchema } from "@/app/lib/zodValidations/projects/updateProject";
import moment from "moment";

connectDb();

// Defining an interface for the FAQ object
interface FAQInterface {
  _id: string;
  question: string;
  answer: string;
}

// ============This is the method to fetch a particular project from the database
export const GET = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const projectId = params.id;
  // ============checking if the id provided is valid or not
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError("Invalid project id provided", StatusCodes.BAD_REQUEST);
  }

  // ======finding the project in the db
  let foundProject = await Project.findOne({
    _id: projectId,
  });

  // ============if project not found then returning api-error
  if (!foundProject) {
    throw new ApiError(
      "No project found with the provided id",
      StatusCodes.NOT_FOUND
    );
  }
  if (foundProject.isHidden) {
    const payload: any = await getPayloadFromTokenAfterVerification();
    const adminFound = await Admin.findOne({ firebaseId: payload.uid });
    if (!adminFound) {
      throw new ApiError(
        "No admin found with the provided token",
        StatusCodes.BAD_REQUEST
      );
    }
  }

  // ==============if all good then returning response
  return ApiResponse(
    "Project fetched successfully",
    StatusCodes.OK,
    foundProject
  );
});

// ================This is the method to update a particular project in the database(token required)
export const PATCH = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
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

  const projectId = params.id;
  // ============checking if the id provided is valid or not
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError("Invalid project id provided", StatusCodes.BAD_REQUEST);
  }
  // ======finding the project in the db
  const foundProject = await Project.findOne({
    _id: projectId,
  });

  // ============if project not found then returning api-error
  if (!foundProject) {
    throw new ApiError(
      "No project found with the provided id",
      StatusCodes.NOT_FOUND
    );
  }
  const reqBody = await req.json();
  const parsedReqBody: any = updateProjectZodSchema.parse(reqBody);

  const currentTimestamp = moment();
  if (parsedReqBody.releaseDate) {
    // ============New logic for isLaunchedRecently and isUpcomingProject
    // let isLaunchedRecently: any, isUpcomingProject: any;//=======commenting this because now I am adding these two as a property in parsedReqBody
    const releaseDateMoment = moment(parsedReqBody.releaseDate);
    const oneMonthAgo = moment().subtract(1, "months");
    if (releaseDateMoment > currentTimestamp) {
      parsedReqBody.isUpcomingProject = true;
      parsedReqBody.isLaunchedRecently = false;
    } else if (
      releaseDateMoment <= currentTimestamp &&
      releaseDateMoment > oneMonthAgo
    ) {
      parsedReqBody.isUpcomingProject = false;
      parsedReqBody.isLaunchedRecently = true;
    } else {
      parsedReqBody.isUpcomingProject = false;
      parsedReqBody.isLaunchedRecently = false;
    }
  }

  // ========if occupancy date is coming then only
  if (parsedReqBody.occupancyDate) {
    // ==========New logic for closingIn stuff
    const occupancyDateMoment = moment(parsedReqBody.occupancyDate);
    // const currentTimestamp = moment();   // commenting this because currentTimestamp already there above

    if (occupancyDateMoment < currentTimestamp) {
      throw new ApiError(
        "Occupancy date should be of future date",
        StatusCodes.BAD_REQUEST
      );
    }
    const monthsDifference = occupancyDateMoment.diff(
      currentTimestamp,
      "months"
    );

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
    parsedReqBody.closingIn = closingIn;
  }
  const updatedProject = await Project.findByIdAndUpdate(
    foundProject._id,
    {
      ...parsedReqBody,
    },
    {
      new: true,
    }
  );

  return ApiResponse(
    "project updated successfully",
    StatusCodes.OK,
    updatedProject
  );
});

// ==========This is the method to delete a project from the database(token required)
export const DELETE = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
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
  const id = params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw {
      message: "Invalid ID provided in the path params.",
      statusCode: 400,
    };
  }
  const projectId = params.id;
  // ============checking if the id provided is valid or not
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError("Invalid project id provided", StatusCodes.BAD_REQUEST);
  }
  // ============= Any one of the below method can be used to delete a condo, but there is a difference in the returned value
  const deletedProject = await Project.findOneAndDelete({
    _id: id,
    // uploadedByAdmin: adminFound._id,
  });
  // const deletedCondo = await Project.deleteOne({ _id: id });
  if (!deletedProject) {
    throw new ApiError(
      "No project found with the provided id",
      StatusCodes.NOT_FOUND
    );
  }

  return ApiResponse(
    "Project deleted successfully",
    StatusCodes.OK,
    deletedProject
  );
});
