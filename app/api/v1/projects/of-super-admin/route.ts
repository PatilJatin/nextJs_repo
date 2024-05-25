import { connectDb } from "@/dbConfig/dbConfig";
import { Project } from "@/models/project-model";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// ================This is the method to find all the projects of super admin This is a requirement from frontend
export async function GET(req: NextRequest) {
  try {
    // console.log("Inside super");
    const allProjectsOfSuperAdmin = await Project.find({
      uploadedByAdmin: "656eba4dd042362933ece1ae", //=======This is super admin Id
    });
    return NextResponse.json(
      {
        totalProjectsOfSuperAdmin: allProjectsOfSuperAdmin.length,
        data: allProjectsOfSuperAdmin,
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
