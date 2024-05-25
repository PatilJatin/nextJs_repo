// Make sure to import the correct path to your author model
import { authorUpdateSchema } from "@/app/lib/zodValidations/authors/authorZod";
import { ApiError } from "@/app/utils/api-error";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { Author } from "@/models/author-model";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export const DELETE = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const id = params.id;
  const deletedAuthor = await Author.findOneAndDelete({ _id: id });

  if (!deletedAuthor) {
    throw new ApiError("Author not found", StatusCodes.NOT_FOUND);
  }

  return ApiResponse(
    "Author deleted successfully",
    StatusCodes.OK,
    deletedAuthor
  );
});
// Get Author by ID
export const GET = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const id = params.id;

  const author = await Author.findById(id);

  if (!author) {
    throw new ApiError("Author not found", StatusCodes.NOT_FOUND);
  }

  return ApiResponse("Author Fetched", StatusCodes.OK, author);
});

// Patch (Update) Author by ID
export const PATCH = asyncHandler(async function (
  req: NextRequest,
  { params, body }: { params: { id: string }; body: any },
  res: NextResponse
) {
  const id = params.id;
  const reqBody = await req.json();
  const newUser = authorUpdateSchema.parse(reqBody);
  const updatedAuthor = await Author.findByIdAndUpdate(id, newUser, {
    new: true,
    runValidators: true,
  });

  return ApiResponse(
    "Author updated successfully",
    StatusCodes.OK,
    updatedAuthor
  );
});
