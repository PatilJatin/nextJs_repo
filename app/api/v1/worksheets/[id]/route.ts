import { connectDb } from "@/dbConfig/dbConfig";
import { Worksheet } from "@/models/worksheet-model";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/models/admin-model";
import mongoose from "mongoose";
import { updatePodcastZodSchema } from "@/app/lib/zodValidations/podcasts/updatePodcast";
import { ZodError } from "zod";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiError } from "@/app/utils/api-error";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "@/app/utils/api-response";

// =====================DB connection
connectDb();

// ============This is the method to fetch a particular worksheet from the database
export const GET = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  console.log("Inside get a worksheet");
  const worksheetId = params.id;
  if (!mongoose.Types.ObjectId.isValid(worksheetId)) {
    throw new ApiError(
      "Invalid worksheetId id provided in the path params.",
      StatusCodes.BAD_REQUEST
    );
  }
  const foundWorksheet = await Worksheet.findById(worksheetId);
  if (!foundWorksheet) {
    throw new ApiError(
      "No worksheet found with the provided id",
      StatusCodes.NOT_FOUND
    );
  }

  return ApiResponse(
    "Worksheet fetched successfully",
    StatusCodes.OK,
    foundWorksheet
  );
});

// ============This is the method to delete a worsheet from the database
export const DELETE = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const worksheetId = params.id;
  if (!mongoose.Types.ObjectId.isValid(worksheetId)) {
    throw new ApiError(
      "Invalid worksheetId id provided in the path params.",
      StatusCodes.BAD_REQUEST
    );
  }

  const deletedWorksheet = await Worksheet.findOneAndDelete({
    _id: worksheetId,
    // uploadedByAdmin: adminFound._id,
  });
  if (!deletedWorksheet) {
    throw new ApiError(
      "No worksheet deleted because id provided do not belong to a worksheet ",
      StatusCodes.NOT_FOUND
    );
  }

  return ApiResponse(
    "worksheet deleted successfully",
    StatusCodes.OK,
    deletedWorksheet
  );
});
