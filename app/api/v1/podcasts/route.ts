import { connectDb } from "@/dbConfig/dbConfig";
import { Podcast } from "@/models/podcast-model";
import { NextRequest, NextResponse } from "next/server";
import { createPodcastZodSchema } from "@/app/lib/zodValidations/podcasts/createPodcast";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { ZodError } from "zod";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/app/utils/api-error";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { throttle } from "lodash";
import { Admin } from "@/models/admin-model";

// =========DB connection
connectDb();

// ===================This is the method to create a podcast in the database (token required)
export const POST = asyncHandler(async function POST(
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

  const reqBody = await req.json();
  const parsedReqBody = createPodcastZodSchema.parse(reqBody);
  const createdPodcast = await Podcast.create({
    ...parsedReqBody,
  });

  return ApiResponse(
    "Podcast created successfully",
    StatusCodes.CREATED,
    createdPodcast
  );
});

// ================This is the method to fetch all the podcasts from the database category wise(modified this)
export const GET = asyncHandler(async function (req: NextRequest) {
  const allPodcasts = await Podcast.find();
  return ApiResponse(
    "allPodcasts fetched successfully",
    StatusCodes.OK,
    allPodcasts
  );
});
