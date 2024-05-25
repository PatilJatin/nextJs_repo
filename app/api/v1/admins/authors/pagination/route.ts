import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { Author } from "@/models/author-model";
import { StatusCodes } from "http-status-codes";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// ================This is the method to filter projects based on the filter object being provided from the frontend

export const GET = asyncHandler(async function (request: NextRequest) {
  const searchParams: any = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  // console.log(page, limit);

  const totalDocs = await Author.countDocuments();
  const totalPages = Math.ceil(totalDocs / limit);
  const skip = (page - 1) * limit;

  const data = await Author.find().skip(skip).limit(limit);
  const responseData = {
    count: totalDocs,
    data: data,
    totalPages,
    currentPage: page,
  };
  return ApiResponse("Author Fetch successfully", StatusCodes.OK, responseData);
});
