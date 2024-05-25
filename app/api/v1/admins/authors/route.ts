import { authorCreateSchema } from "@/app/lib/zodValidations/authors/authorZod";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { Author } from "@/models/author-model";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export const POST = asyncHandler(async function (request: NextRequest) {
  const reqBody = await request.json();
  const user = authorCreateSchema.parse(reqBody);
  const newAuthor = new Author(user);
  const savedAuthor = await newAuthor.save();
  return ApiResponse(
    "Author created successfully",
    StatusCodes.OK,
    savedAuthor
  );
});

export const GET = asyncHandler(async function (request: NextRequest) {
  const authors = await Author.find();
  const data = {
    totalAuthors: authors.length,
    data: authors,
  };
  return ApiResponse("Fetch All Author", StatusCodes.OK, data);
});
