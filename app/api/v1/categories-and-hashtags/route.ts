import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { CategoryAndHashtag } from "@/models/categoryAndHashTags.model";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

// establishing DB conection
connectDb();

// =========Method to get all categories and hashtags
// export const GET = asyncHandler(async function (req: NextRequest) {
//   const categoriesAndHashtags = await CategoryAndHashtag.find();
//   return ApiResponse(
//     "categories-and-hashtags fetched Succesfully",
//     StatusCodes.OK,
//     categoriesAndHashtags
//   );
// });

// GET API call
export const GET = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const categoryId = "6614be6cf20b68da99f90f85"; // Fixed ID

  const categoryAndHashtag = await CategoryAndHashtag.findById(categoryId);

  if (!categoryAndHashtag) {
    throw new Error("Category and hashtag not found");
  }

  return ApiResponse(
    "Category and hashtag fetched successfully",
    StatusCodes.OK,
    categoryAndHashtag
  );
});

// POST API call
export const POST = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const reqBody = await req.json();
  const newCategoryAndHashtag = new CategoryAndHashtag(reqBody);
  const savedCategoryAndHashtag = await newCategoryAndHashtag.save();
  return ApiResponse(
    "Category and hashtag saved successfully",
    StatusCodes.CREATED,
    savedCategoryAndHashtag
  );
});

// PATCH API call
export const PATCH = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const reqBody = await req.json();
  const _id = "6614be6cf20b68da99f90f85";
  const { ...updateData } = reqBody;

  const updatedCategoryAndHashtag = await CategoryAndHashtag.findByIdAndUpdate(
    _id,
    updateData,
    { new: true }
  );

  if (!updatedCategoryAndHashtag) {
    throw new Error("Category and hashtag not found");
  }

  return ApiResponse(
    "Category and hashtag updated successfully",
    StatusCodes.OK,
    updatedCategoryAndHashtag
  );
});
