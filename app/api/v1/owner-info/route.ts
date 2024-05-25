import { connectDb } from "@/dbConfig/dbConfig";
import { OwnerInfo } from "@/models/ownerInfo.model";
import { NextRequest, NextResponse } from "next/server";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/app/utils/api-error";
import { Admin } from "@/models/admin-model";
import { updateOwnerInfoZodSchema } from "@/app/lib/zodValidations/ownerInfo/updateOwnerInfo";

// =========DB connection
connectDb();

// ==========this is the method to update owner info in the DB
export const PUT = asyncHandler(async function (
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
  let foundOwnerInfo = await OwnerInfo.findOne();
  if (!foundOwnerInfo) {
    foundOwnerInfo = await OwnerInfo.create({});
  }

  const reqBody = await req.json();
  const parsedReqBody = updateOwnerInfoZodSchema.parse(reqBody);
  const updatedOwnerInfo = await OwnerInfo.findOneAndUpdate({}, parsedReqBody, {
    new: true,
  });

  return ApiResponse(
    "owner info updated successfully",
    StatusCodes.OK,
    updatedOwnerInfo
  );
});

// ================This is the method to fetch owner info from the DB
export const GET = asyncHandler(async function (req: NextRequest) {
  let foundOwnerInfo = await OwnerInfo.findOne();
  if (!foundOwnerInfo) {
    foundOwnerInfo = await OwnerInfo.create({});
  }
  return ApiResponse(
    "owner info fetched successfully",
    StatusCodes.OK,
    foundOwnerInfo
  );
});
