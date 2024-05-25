import { DynamicData } from "@/models/dynamicData";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";

connectDb();
export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    console.log("Inside!!!");
    const reqBody = await req.json();

    // Build the update object dynamically based on the fields present in the request body
    const updateObject: any = {};
    const ownerFields = [
      "ownerName",
      "ownerRole",
      "ownerDesignation",
      "ownerSpeciality",
      "ownerArea",
      "ownerDescription",
    ];

    ownerFields.forEach((field) => {
      if (reqBody[field] !== undefined) {
        updateObject[field] = reqBody[field];
      }
    });

    console.log(updateObject, "@@@@");

    const updatedDynamicData = await DynamicData.findOneAndUpdate(
      {},
      {
        $set: updateObject,
      },
      { new: true }
    );

    console.log("After update@@@@@@@@@@@");
    if (!updatedDynamicData) {
      throw {
        message: "No DynamicData updated because it is not there in the DB",
        statusCode: 403,
      };
    }

    return NextResponse.json(
      {
        msg: "DynamicData updated successfully",
        data: updatedDynamicData,
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
