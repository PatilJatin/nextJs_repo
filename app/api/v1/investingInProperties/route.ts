import { createInvestingInPropertiesSchema } from "@/app/lib/zodValidations/InvestingInProperties/createInvestingInProperties";
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

// establishing DB conection
connectDb();

export const GET = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  let allInvestingInProperties = await InvestingInProperties.find();

  return ApiResponse(
    "allInvestingInProperties fetched Succesfully",
    StatusCodes.OK,
    allInvestingInProperties
  );
});

// Method to create InvestingInProperties
export const POST = asyncHandler(async function (req: NextRequest) {
  const payload: any = await getPayloadFromTokenAfterVerification();
  const adminFound = await Admin.findOne({ firebaseId: payload.uid });
  if (!adminFound) {
    throw new ApiError(
      "No admin found with the provided token",
      StatusCodes.BAD_REQUEST
    );
  }

  const reqBody = await req.json();
  const parsedReqBody: any = createInvestingInPropertiesSchema.parse(reqBody);

  const createdInvestingInProperties = await InvestingInProperties.create(
    parsedReqBody
  );

  return ApiResponse(
    "InvestingInProperties created successfully",
    StatusCodes.OK,
    createdInvestingInProperties
  );
});
