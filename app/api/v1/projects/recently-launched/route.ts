import { Project } from "@/models/project-model";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";

connectDb();

interface TopProjectsResponse {
  top10RecentProjects: number;
  data: (typeof Project)[];
}
export const GET = asyncHandler(async function (req: NextRequest) {
  // console.log("Inside recently @@@@@@@@@@@");
  const recentlyLaunchedProjects = await Project.find({
    isHidden: false,
    isLaunchedRecently: true,
  });

  return ApiResponse(
    "recently launched projects fetched successfully",
    StatusCodes.OK,
    recentlyLaunchedProjects
  );
});
