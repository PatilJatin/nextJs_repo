import { connectDb } from "@/dbConfig/dbConfig";
import { Podcast } from "@/models/podcast-model";
import { NextRequest } from "next/server";

import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "@/app/utils/asyncHandler";

connectDb();

export const GET = asyncHandler(async function (req: NextRequest) {
  const categoryWisePodcasts = await Podcast.aggregate([
    {
      $group: {
        _id: "$category", // Group by the category field
        podcasts: { $push: "$$ROOT" }, // Push the entire document into the podcasts array
      },
    },
    {
      $project: {
        categoryName: "$_id", // Rename _id to categoryName
        podcasts: 1, // Keep the podcasts field
      },
    },
    {
      $project: {
        _id: 0, // Exclude _id field
        categoryName: 1, // Keep the categoryName field
        podcasts: 1, // Keep the podcasts field
      },
    },
  ]);

  return ApiResponse(
    "categoryWisePodcasts fetched successfully",
    StatusCodes.OK,
    categoryWisePodcasts
  );
});
