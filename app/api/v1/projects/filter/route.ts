import { connectDb } from "@/dbConfig/dbConfig";
import { Project } from "@/models/project-model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

// ================This is the method to filter projects based on the filter object being provided from the frontend

export async function POST(req: NextRequest) {
  try {
    // // console.log("Inside filter project@@@@@@@");
    const reqBody = await req.json();
    const { location, developer, occupancyDate, deposit } = reqBody;

    // Building a filter object based on the provided parameters from the frontend
    const filter: any = {};

    if (location) {
      filter.city = location;
    }

    if (developer) {
      filter.developerName = developer;
    }
    if (occupancyDate) {
      filter.occupancyDate = occupancyDate;
    }

    // todo: cate me deposite string manipulation karna and sort by 1, 2, +3
    const allFilteredProjects = await Project.find({
      type: "project",
      ...filter,
    });
    return NextResponse.json(
      {
        totalFilteredProjects: allFilteredProjects.length,
        data: allFilteredProjects,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
