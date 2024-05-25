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
import { filterPodcastZodSchema } from "@/app/lib/zodValidations/podcasts/filterPodcast";

// =========DB connection
connectDb();

// ================This is the method to filter all podcasts based on category
export const POST = asyncHandler(async function (req: NextRequest) {
  const reqBody = await req.json();
  const parsedReqBody = filterPodcastZodSchema.parse(reqBody);
  const limit = 10;
  const skip = 0;
  const allFilteredPodcasts = await Podcast.find({
    ...parsedReqBody,
  })
    .skip(skip)
    .limit(limit);

  //============ Count total number of podcasts
  const totalPodcasts = await Podcast.countDocuments();
  // ===========Calculate total pages
  const totalPages = Math.ceil(totalPodcasts / limit);
  return ApiResponse(
    `First ${limit} filtered podcasts fetched successfully.`,
    StatusCodes.OK,

    { totalPodcasts, totalPages, podcasts: allFilteredPodcasts }
  );
});
