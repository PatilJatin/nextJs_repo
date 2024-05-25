import { blogUpdateSchema } from "@/app/lib/zodValidations/blogs/blogZod";
import { ApiError } from "@/app/utils/api-error";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { Blog } from "@/models/blog-model";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

connectDb();

// Delete Blog by ID
export const DELETE = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const id = params.id;
  const deletedBlog = await Blog.findOneAndDelete({ _id: id });

  if (!deletedBlog) {
    throw new ApiError("Blog not found", StatusCodes.NOT_FOUND);
  }

  return ApiResponse("Blog deleted successfully", StatusCodes.OK, deletedBlog);
});

// Get Blog by ID
export const GET = asyncHandler(async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const id = params.id;
  const blog = await Blog.findOne({ _id: id }).populate("authorId");
  if (!blog) {
    throw new ApiError("Blog not found", StatusCodes.NOT_FOUND);
  }
  return ApiResponse("Blog fetched Successfully", StatusCodes.OK, blog);
});

// Patch (Update) Blog by ID
export const PATCH = asyncHandler(async function (
  req: NextRequest,
  { params, body }: { params: { id: string }; body: any },
  res: NextResponse
) {
  const id = params.id;
  const reqBody = await req.json();
  const blogBody = blogUpdateSchema.parse(reqBody);
  const updatedBlog = await Blog.findByIdAndUpdate(id, blogBody, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) {
    throw new ApiError("Blog not found", StatusCodes.NOT_FOUND);
  }

  return ApiResponse("Blog updated successfully", StatusCodes.OK, updatedBlog);
});
