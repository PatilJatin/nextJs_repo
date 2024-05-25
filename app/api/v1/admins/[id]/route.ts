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

connectDb();

// ================This is the method to delete an admin from the database
export const DELETE = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const adminId = params.id;
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    throw new ApiError("Invalid admin id provided", StatusCodes.BAD_REQUEST);
  }
  // ============= Any one of the below method can be used to delete a admin, but there is a difference in the returned value
  const deletedAdminInMongo = await Admin.findOneAndDelete({
    _id: adminId,
    isSuperAdmin: false,
  });

  // const deletedAdmin = await Admin.deleteOne({ _id: id ,  isSuperAdmin: false,});

  if (!deletedAdminInMongo) {
    throw new ApiError(
      "No Admin deleted from mongoDB because the id provided in the path params do not belong to any Admin in the DB",
      StatusCodes.NOT_FOUND
    );
  }
  const deletedAdminInFB = await adminAuth.deleteUser(
    deletedAdminInMongo.firebaseId
  );

  return ApiResponse(
    "admin deleted successfully from mongo and FB both",
    StatusCodes.OK,
    deletedAdminInMongo
  );
});

// ===============this is the method to update an Admin in the databasename and status only

export const PATCH = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const adminId = params.id;
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    throw new ApiError("Invalid admin id provided", StatusCodes.BAD_REQUEST);
  }
  const foundAdmin = await Admin.findOne({
    _id: adminId,
    isSuperAdmin: false,
  });

  if (!foundAdmin) {
    throw new ApiError(
      "No Admin found because the id provided in the path params do not belong to any Admin in the DB",
      StatusCodes.NOT_FOUND
    );
  }
  const reqBody = await req.json();
  console.log(reqBody);

  // const parsedReqBody = updateAdminZodSchema.parse(reqBody);
  // console.log(parsedReqBody);

  const updatedAdmin = await Admin.findByIdAndUpdate(
    foundAdmin.id,
    {
      ...reqBody,
    },
    {
      new: true,
    }
  );
  console.log(updatedAdmin);

  return ApiResponse(
    "Admin updated successfully",
    StatusCodes.OK,
    updatedAdmin
  );
});

// =====commenting this because on deployment it is saying method not allowed with statuscode 405 but on localhost it is running
// // ===========This is the method to fetch an admn from the DB based on email
// export const GET = asyncHandler(async function (
//   req: NextRequest,
//   { params }: { params: { id: string } },
//   res: NextResponse
// ) {
//   // =========though it is written as params.id but I am expecting email here in params because of GET method
//   const adminEmail = params.id;

//   const foundAdmin = await Admin.findOne({
//     email: adminEmail,
//     // isSuperAdmin: false,
//   });

//   if (!foundAdmin) {
//     throw new ApiError(
//       "No Admin found because the email provided in the path params do not belong to any Admin in the DB",
//       StatusCodes.NOT_FOUND
//     );
//   }

//   return ApiResponse("Admin fetched successfully", StatusCodes.OK, foundAdmin);
// });
