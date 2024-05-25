import { Project } from "@/models/project-model";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";

connectDb();

interface TopProjectsResponse {
  top10RecentProjects: number;
  data: (typeof Project)[];
}
export async function GET(req: NextRequest) {
  try {
    // console.log("Fetching top 10 recent projects");
    // Fetching all projects sorted by createdAt in descending order
    const allProjects = await Project.find().sort({ createdAt: -1 });

    // Filtering projects where isLaunchedRecently is true
    const recentlyLaunchedProjects: (typeof Project)[] = allProjects.filter(
      (project) => project.isLaunchedRecently
    );
    // // console.log(recentlyLaunchedProjects);
    // Taking only the top 10 recent projects
    const top10RecentProjects: (typeof Project)[] =
      recentlyLaunchedProjects.slice(0, 10);

    // Define the response data
    const responseData: TopProjectsResponse = {
      top10RecentProjects: top10RecentProjects.length,
      data: top10RecentProjects,
    };

    return NextResponse.json(responseData, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
