import { Project } from "@/models/project-model";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";

connectDb();

// ================This is the method to find all the projects with a specific category
export const GET = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { category: string } },
  res: NextResponse
) {
  const { category } = params;
  // console.log("Inside category specific@@@", category);
  // console.log("encodeURIComponent", encodeURIComponent("5 % Selling"));
  const categorySpecificProjects = await Project.find({
    isHidden: false,
    categories: { $in: [category] },
  });

  return ApiResponse(
    "category specific projects fetched successfully",
    StatusCodes.OK,
    categorySpecificProjects
  );
});
