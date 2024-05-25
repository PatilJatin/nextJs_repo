import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { Admin } from "@/models/admin-model";
import { Project } from "@/models/project-model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";

connectDb();

// ============This is the method to fetch a particular project which is specific to an Admin
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    // // console.log("Inside admin specific project########");
    const payload: any = await getPayloadFromTokenAfterVerification();
    const adminFound = await Admin.findOne({ firebaseId: payload.uid });
    // // console.log("This is the admin found", adminFound);
    if (!adminFound) {
      throw {
        message: "No admin found with the provided token",
        statusCode: 400,
      };
    }
    const projectId = params.id;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw {
        message: "Invalid project ID provided in the path params.",
        statusCode: 400,
      };
    }
    const foundProject = await Project.findOne({
      _id: projectId,
      uploadedByAdmin: adminFound._id,
    }).populate(["faqs", "auditLogs"]);

    if (!foundProject) {
      throw {
        message:
          "No project fetched because id provided do not belong to a project or you are not the admin who uploaded this project",
        statusCode: 403,
      };
    }
    return NextResponse.json(
      {
        msg: "project fetched successfully",
        data: foundProject,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.statusCode,
      }
    );
  }
}
