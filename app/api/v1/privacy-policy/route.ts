import { connectDb } from "@/dbConfig/dbConfig";
import { PrivacyPolicy } from "@/models/privacyPolicy-model";
import { NextRequest, NextResponse } from "next/server";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { updatePrivacyPolicyZodSchema } from "@/app/lib/zodValidations/privacyPolicy/updatePrivacyPolicy";
import { ApiError } from "@/app/utils/api-error";
import { Admin } from "@/models/admin-model";

// =========DB connection
connectDb();

// ==========thiks is the method to update privacy policy in the DB
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
  let foundPrivacyPolicy = await PrivacyPolicy.findOne();
  if (!foundPrivacyPolicy) {
    foundPrivacyPolicy = await PrivacyPolicy.create({});
  }

  const reqBody = await req.json();
  const parsedReqBody = updatePrivacyPolicyZodSchema.parse(reqBody);
  const updatedPrivacyPolicy = await PrivacyPolicy.findOneAndUpdate(
    {},
    parsedReqBody,
    {
      new: true,
    }
  );

  return ApiResponse(
    "privacy policy updated successfully",
    StatusCodes.OK,
    updatedPrivacyPolicy
  );
});

// ================This is the method to fetch privacy policy from the DB
export const GET = asyncHandler(async function (req: NextRequest) {
  let foundPrivacyPolicy = await PrivacyPolicy.findOne();
  if (!foundPrivacyPolicy) {
    foundPrivacyPolicy = await PrivacyPolicy.create({});
  }
  return ApiResponse(
    "privacy policy fetched successfully",
    StatusCodes.OK,
    foundPrivacyPolicy
  );
});
