import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { connectDb } from "@/dbConfig/dbConfig";

import { Admin } from "@/models/admin-model";
import { DynamicData } from "@/models/dynamicData";
import { NextRequest, NextResponse } from "next/server";

connectDb();
// =================This is the method to update the dynamic data this will be hit by the website automatically(for updating the users array inside DynamicData)
export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { user } = reqBody;
    // ===================checking if user already exists in the db
    const userExists = await DynamicData.findOne({
      users: { $elemMatch: { $eq: user } },
    });

    // ==============if user exists then throwing a 200 response
    if (userExists) {
      throw {
        message: "user already exists",
        statusCode: 200,
      };
    }
    const updatedDynamicData = await DynamicData.findOneAndUpdate(
      {},
      {
        $push: {
          users: user,
        },
      },
      { new: true }
    );
    // console.log("updatedDynamicData", updatedDynamicData);

    // ====================throwing an error is there is no Dunamic data in the database
    if (!updatedDynamicData) {
      throw {
        message: "No DynamicData updated because it is not there in the DB",
        statusCode: 403,
      };
    }

    // ==============sending the response if everything is ok
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
    // console.log("Inside catch");
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
