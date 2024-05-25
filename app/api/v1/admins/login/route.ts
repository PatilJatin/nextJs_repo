import { NextRequest, NextResponse } from "next/server";
require("dotenv").config();

import jwt from "jsonwebtoken";
import { connectDb } from "@/dbConfig/dbConfig";
import { Admin } from "@/models/admin-model";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/app/utils/api-error";
connectDb();

export const POST = asyncHandler(async function (request: NextRequest) {
  const verifiedToken: any = await getPayloadFromTokenAfterVerification();
  const { email } = verifiedToken;

  //check if user exists
  const foundAdmin = await Admin.findOne({ email });
  if (!foundAdmin) {
    return new ApiError(
      "No admin found with the provided email",
      StatusCodes.NOT_FOUND
    );
  }

  return ApiResponse("Login successful", StatusCodes.OK, foundAdmin);
});
