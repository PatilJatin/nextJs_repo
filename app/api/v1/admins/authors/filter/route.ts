import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { Author } from "@/models/author-model";
import { StatusCodes } from "http-status-codes";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// ================This is the method to filter projects based on the filter object being provided from the frontend

export const GET = asyncHandler(async function (request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  console.log(query);
  let sortCriteria = {};
  if (query === "newest to oldest") {
    sortCriteria = { createdAt: -1 };
  } else if (query === "oldest to newest") {
    sortCriteria = { createdAt: 1 };
  }
  const authors = await Author.find().sort(sortCriteria);
  const response = {
    totalAuthors: authors.length,
    data: authors,
  };
  return ApiResponse("Author Fetch succesfully", StatusCodes.OK, response);
});
