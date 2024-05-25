import { connectDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/models/admin-model";
import mongoose from "mongoose";
import { updateAdminZodSchema } from "@/app/lib/zodValidations/admins/updateAdmin";
import { ZodError } from "zod";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiError } from "@/app/utils/api-error";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "@/app/utils/api-response";
import { adminAuth } from "@/Firebase/firebase";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { getAdminZodSchema } from "@/app/lib/zodValidations/admins/getAdmin";

connectDb();

// ===========This is the method to fetch an admin from the DB based on email
// ===============this is the method to create an Admin in the database
export const POST = asyncHandler(async function (request: NextRequest) {
  const reqBody = await request.json();
  const parsedReqBody = getAdminZodSchema.parse(reqBody);

  const foundAdmin = await Admin.findOne({
    email: parsedReqBody.email,
    // isSuperAdmin: false,
  });

  if (!foundAdmin) {
    throw new ApiError(
      "No Admin found because the email provided do not belong to any Admin in the DB",
      StatusCodes.NOT_FOUND
    );
  }

  return ApiResponse("Admin fetched successfully", StatusCodes.OK, foundAdmin);
});
