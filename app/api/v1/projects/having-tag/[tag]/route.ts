import { Project } from "@/models/project-model";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";

connectDb();

// ================This is the method to find all the projects with a specific tag
export const GET = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { tag: string } },
  res: NextResponse
) {
  const { tag } = params;
  const tagSpecificProjects = await Project.find({
    isHidden: false,
    hashtags: { $in: [tag] },
  });

  return ApiResponse(
    "tag specific projects fetched successfully",
    StatusCodes.OK,
    tagSpecificProjects
  );
});
