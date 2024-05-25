import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { Blog } from "@/models/blog-model";
import { StatusCodes } from "http-status-codes";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// ================This is the method to filter projects based on the filter object being provided from the frontend

export const GET = asyncHandler(async function (request: NextRequest) {
  const searchParams: any = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  console.log("searchParams", searchParams);
  console.log(typeof page, typeof limit);

  const totalDocs = await Blog.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);
  // console.log("totalPages", totalPages);
  const skip = (page - 1) * limit;

  const data = await Blog.find().limit(limit).skip(skip);
  const response = {
    count: totalDocs,
    data: data,
    totalPages,
    currentPage: page,
  };
  return ApiResponse(
    "All Blogs fetched with pagination succesfully",
    StatusCodes.OK,
    response
  );
});
