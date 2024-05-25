import { ApiError } from "@/app/utils/api-error";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { Admin } from "@/models/admin-model";
import Lead from "@/models/lead-model";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
connectDb();

// ================This is the method to delete a particular lead after it has been taken by an ADMIN
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
  const deletedLead = await Lead.findOneAndDelete({ _id: id });
  return ApiResponse("Lead deleted successfully", StatusCodes.OK, deletedLead);
});

export const GET = asyncHandler(async function (
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
  const foundLead = await Lead.findById({ _id: id });
  if (!foundLead) {
    throw new ApiError("lead not found", StatusCodes.BAD_REQUEST);
  }
  return ApiResponse("Lead Fetched successfully", StatusCodes.OK, foundLead);
});
