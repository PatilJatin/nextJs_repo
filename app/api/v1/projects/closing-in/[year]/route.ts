import { Project } from "@/models/project-model";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/app/utils/api-error";

// connection with the DB
connectDb();

// Method to fetch projects based on closing in filter
export const GET = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { year: string } },
  res: NextResponse
) {
  const { year } = params;
  console.log(year);

  // ========NOTE:- for 0-12 month I am expecting 12
  const yearInInt = +year;

  if (isNaN(yearInInt)) {
    throw new ApiError(
      `${year} is an invalid year value`,
      StatusCodes.BAD_REQUEST
    );
  }
  const filteredProjectsBasedOnClosingIn = await Project.find({
    isHidden: false,
    closingIn: yearInInt,
  });

  return ApiResponse(
    "projects filtered based on closing in",
    StatusCodes.OK,
    filteredProjectsBasedOnClosingIn
  );
});
