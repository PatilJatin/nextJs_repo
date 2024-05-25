import { connectDb } from "@/dbConfig/dbConfig";
import { Podcast } from "@/models/podcast-model";
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

// ============This is the method to fetch a particular podcast from the database
export const GET = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const podcastId = params.id;
  if (!mongoose.Types.ObjectId.isValid(podcastId)) {
    throw new ApiError(
      "Invalid podcast id provided in the path params.",
      StatusCodes.BAD_REQUEST
    );
  }
  const foundPodcast = await Podcast.findById(podcastId);
  if (!foundPodcast) {
    throw new ApiError(
      "No podcast found with the provided id",
      StatusCodes.NOT_FOUND
    );
  }

  return ApiResponse(
    "Podcast fetched successfully",
    StatusCodes.OK,
    foundPodcast
  );
});

// ================This is the method to update a particular podcast in the database (token required)
export const PATCH = asyncHandler(async function (
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
  const podcastId: string = params.id;
  if (!mongoose.Types.ObjectId.isValid(podcastId)) {
    throw new ApiError(
      "Invalid ID provided in the path params.",
      StatusCodes.BAD_REQUEST
    );
  }
  const existingPodcast = await Podcast.findById(podcastId);
  if (!existingPodcast) {
    throw new ApiError(
      "No podcast found with the provided id",
      StatusCodes.NOT_FOUND
    );
  }

  const reqBody = await req.json();
  const parsedReqBody = updatePodcastZodSchema.parse(reqBody);

  const updatedPodcast = await Podcast.findByIdAndUpdate(
    existingPodcast.id,
    parsedReqBody,
    {
      new: true,
    }
  );

  return ApiResponse(
    "podcast updated successfully",
    StatusCodes.OK,
    updatedPodcast
  );
});

// ============This is the method to delete a podcast from the database(token required)
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
  const podcastId = params.id;
  if (!mongoose.Types.ObjectId.isValid(podcastId)) {
    throw new ApiError(
      "Invalid ID provided in the path params.",
      StatusCodes.BAD_REQUEST
    );
  }
  const deletedPodcast = await Podcast.findOneAndDelete({
    _id: podcastId,
    // uploadedByAdmin: adminFound._id,
  });
  if (!deletedPodcast) {
    throw new ApiError(
      "No podcast found with the provided id",
      StatusCodes.NOT_FOUND
    );
  }

  return ApiResponse(
    "Podcast deleted successfully",
    StatusCodes.OK,
    deletedPodcast
  );
});
