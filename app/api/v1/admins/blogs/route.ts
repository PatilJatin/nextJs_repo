import { blogCreateSchema } from "@/app/lib/zodValidations/blogs/blogZod";
import { ApiError } from "@/app/utils/api-error";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { Author } from "@/models/author-model";
import { Blog } from "@/models/blog-model";
import { current } from "@reduxjs/toolkit";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

connectDb();
export const POST = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const reqBody = await req.json();
  const blogBody = blogCreateSchema.parse(reqBody);
  console.log(blogBody);

  const { authorId } = blogBody;
  const existingAuthor = await Author.findById(authorId);
  if (!existingAuthor) {
    throw new ApiError(
      "Invalid Author id provided in the path params.",
      StatusCodes.NOT_FOUND
    );
  }
  const newBlog = new Blog(blogBody);
  // console.log("newblog", newBlog);
  const savedBlog = await newBlog.save();
  return ApiResponse(
    "Blog created successfully",
    StatusCodes.CREATED,
    savedBlog
  );
});

export const GET = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const page = parseInt(searchParams.get("page")!) || 1;
  const limit = parseInt(searchParams.get("limit")!) || 10;
  const skip = (page - 1) * limit;
  const blogs = await Blog.find().skip(skip).limit(limit).populate({
    path: "authorId",
  });
  const totalBlogsCount = await Blog.countDocuments();

  const totalPages = Math.ceil(totalBlogsCount / limit);

  return ApiResponse(
    "All blogs fetched successfully with pagination",
    StatusCodes.OK,
    {
      totalBlogsCount,
      totalPages,
      currentPage: page,
      limit,
      blogs,
    }
  );
});
