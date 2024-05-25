import { Project } from "@/models/project-model";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";

connectDb();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const singleFamPojects = await Project.find({
      isSingleFamilyHomeProject: true,
    });

    return NextResponse.json(
      {
        singleFamPojects: singleFamPojects.length,
        data: singleFamPojects,
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
