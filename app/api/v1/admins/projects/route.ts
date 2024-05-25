import { NextRequest, NextResponse } from "next/server";
import { Project } from "@/models/project-model";
import { Admin } from "@/models/admin-model";
import { connectDb } from "@/dbConfig/dbConfig";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";

connectDb();
// ================This is the method to find all admin specific projects
export async function GET(req: NextRequest) {
  try {
    const payload: any = await getPayloadFromTokenAfterVerification();
    const adminFound = await Admin.findOne({ firebaseId: payload.uid });
    if (!adminFound) {
      throw {
        message: "No admin found with the provided token",
        statusCode: 400,
      };
    }
    const allProjectsOfLoggedInAdmin = await Project.find({
      uploadedByAdmin: adminFound._id,
    });
    return NextResponse.json(
      {
        totalProjectsUploadedByYou: allProjectsOfLoggedInAdmin.length,
        data: allProjectsOfLoggedInAdmin,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: error.statusCode,
      }
    );
  }
}
