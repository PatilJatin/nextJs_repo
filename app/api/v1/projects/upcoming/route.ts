import { Project } from "@/models/project-model";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";

connectDb();

// =============Method to find upcoming projects
export const GET = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  console.log("Inside ipcoming");
  const upcomingPojects = await Project.find({
    isHidden: false,
    isUpcomingProject: true,
  });

  return ApiResponse(
    "Upcoming projects fetched successfully",
    StatusCodes.OK,
    upcomingPojects
  );
});
