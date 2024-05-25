// Method to update InvestingInProperties
import { updateInvestingInPropertiesSchema } from "@/app/lib/zodValidations/InvestingInProperties/updateInvestingInProperties";
import { ApiError } from "@/app/utils/api-error";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { Admin } from "@/models/admin-model";
import { InvestingInProperties } from "@/models/investingInPropeties-model";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// =========method to update a InvestingInProperties
export const PATCH = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const payload: any = await getPayloadFromTokenAfterVerification();
  const adminFound = await Admin.findOne({ firebaseId: payload.uid });
  if (!adminFound) {
    throw new ApiError(
      "No admin found with the provided token",
      StatusCodes.BAD_REQUEST
    );
  }

  const investingInPropetiesId = params.id;
  // ============checking if the id provided is valid or not
  if (!mongoose.Types.ObjectId.isValid(investingInPropetiesId)) {
    throw new ApiError(
      "Invalid investingInPropeties id provided",
      StatusCodes.BAD_REQUEST
    );
  }
  // ======finding the project in the db
  const foundInvestingInProperties = await InvestingInProperties.findOne({
    _id: investingInPropetiesId,
  });

  // ============if project not found then returning api-error
  if (!foundInvestingInProperties) {
    throw new ApiError(
      "No InvestingInProperties found with the provided id",
      StatusCodes.NOT_FOUND
    );
  }
  const reqBody = await req.json();
  const parsedReqBody: any = updateInvestingInPropertiesSchema.parse(reqBody);

  const updatedInvestingInProperties =
    await InvestingInProperties.findByIdAndUpdate(
      foundInvestingInProperties._id,
      parsedReqBody,
      {
        new: true,
      }
    );

  return ApiResponse(
    "InvestingInProperties updated successfully",
    StatusCodes.OK,
    updatedInvestingInProperties
  );
});

// ================method to fetch a single InvestingInProperties
export const GET = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const investingInPropetiesId = params.id;
  // ============checking if the id provided is valid or not
  if (!mongoose.Types.ObjectId.isValid(investingInPropetiesId)) {
    throw new ApiError(
      "Invalid investingInPropeties id provided",
      StatusCodes.BAD_REQUEST
    );
  }
  // ======finding the project in the db
  const foundInvestingInProperties = await InvestingInProperties.findOne({
    _id: investingInPropetiesId,
  });

  // ============if project not found then returning api-error
  if (!foundInvestingInProperties) {
    throw new ApiError(
      "No InvestingInProperties found with the provided id",
      StatusCodes.NOT_FOUND
    );
  }

  return ApiResponse(
    "InvestingInProperties fetched successfully",
    StatusCodes.OK,
    foundInvestingInProperties
  );
});

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
  const invPropId = params.id;
  if (!mongoose.Types.ObjectId.isValid(invPropId)) {
    throw new ApiError(
      "Invalid ID provided in the path params.",
      StatusCodes.BAD_REQUEST
    );
  }
  const deletedPodcast = await InvestingInProperties.findOneAndDelete({
    _id: invPropId,
    // uploadedByAdmin: adminFound._id,
  });
  if (!deletedPodcast) {
    throw new ApiError(
      "No Investing property found with the provided id",
      StatusCodes.NOT_FOUND
    );
  }

  return ApiResponse(
    "Investing property  deleted successfully",
    StatusCodes.OK,
    deletedPodcast
  );
});
