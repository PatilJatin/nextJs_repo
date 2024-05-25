import { adminAuth } from "@/Firebase/firebase";
import { createAdminZodSchema } from "@/app/lib/zodValidations/admins/createAdmin";
import { ApiError } from "@/app/utils/api-error";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";

import { Admin } from "@/models/admin-model";
import { StatusCodes } from "http-status-codes";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// ===============this is the method to create an Admin in the database
export const POST = asyncHandler(async function (request: NextRequest) {
  const reqBody = await request.json();
  const parsedReqBody = createAdminZodSchema.parse(reqBody);

  //==============checking if admin already exists
  const alreadyExistingAdmin = await Admin.findOne({
    email: parsedReqBody.email,
  });

  if (alreadyExistingAdmin) {
    throw new ApiError(
      "Admin already exists with the provided email",
      StatusCodes.CONFLICT
    );
  }

  // =============creating admin in firebase
  const createdAdminInFirebase = await adminAuth.createUser({
    email: parsedReqBody.email,
    password: parsedReqBody.password,
  });

  // ================creating admin in DB
  const newAdmin = await Admin.create({
    name: parsedReqBody.name,
    email: parsedReqBody.email,
    firebaseId: createdAdminInFirebase.uid,
  });

  return ApiResponse(
    "Admin created successfully",
    StatusCodes.CREATED,
    newAdmin
  );
});

// ==========this is the method to fetch all admins from the DB
export const GET = asyncHandler(async function (request: NextRequest) {
  const allAdmins = await Admin.find();

  return ApiResponse(
    "All admins fetched successfully",
    StatusCodes.OK,
    allAdmins
  );
});
