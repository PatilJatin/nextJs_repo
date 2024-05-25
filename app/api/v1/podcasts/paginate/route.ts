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

// ================This is the method to fetch all the podcasts from the database in paginated way
export const GET = asyncHandler(async function (req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const page = parseInt(searchParams.get("page")!) || 1; // Parse page number from query parameter, default to 1
  const limit = parseInt(searchParams.get("limit")!) || 10; // Parse limit from query parameter, default to 10
  const category = searchParams.get("category");
  const name = searchParams.get("name");
  const filter: any = {};
  if (category) {
    filter.category = category;
  }

  if (name) {
    const nameRegex = new RegExp(name, "i");
    filter.name = nameRegex;
  }
  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  // Fetch podcasts with pagination
  const podcasts = await Podcast.find(filter)
    .skip(skip) // Skip documents
    .limit(limit); // Limit number of documents

  // Count total number of podcasts
  const totalPodcasts = await Podcast.countDocuments(filter);

  // Calculate total pages
  const totalPages = Math.ceil(totalPodcasts / limit);

  // Return API response with paginated podcasts
  return ApiResponse(
    `${
      category ? category : "All"
    } podcasts fetched successfully with pagination`,
    StatusCodes.OK,
    {
      totalPodcasts,
      totalPages,
      currentPage: page,
      limit,
      podcasts,
    }
  );
});
