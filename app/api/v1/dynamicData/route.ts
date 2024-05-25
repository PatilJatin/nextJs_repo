import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";
import { DynamicData } from "@/models/dynamicData";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { Admin } from "@/models/admin-model";
import mongoose from "mongoose";

connectDb();

export async function POST() {
  try {
    const payload: any = getPayloadFromTokenAfterVerification();
    // // console.log("This is the payload after verfication ", payload);
    const adminFound = await Admin.findOne({ _id: payload.id });
    if (!adminFound) {
      throw new Error("No admin found with the provided token");
    }

    const existingData = await DynamicData.findOne();

    //==================== Checking if DynamicData pre-exists
    if (existingData) {
      // If data exists, update it
      existingData.categories = [
        "Best Selling",
        "5% Deposit Rate",
        "10% Deposit Rate",
        "Lease Guarantee",
        "Retirement Friendly",
        "Student Rental",
      ];
      existingData.hashtags = ["condo", "property", "ontario"];

      const updatedDynamicData = await existingData.save();

      return NextResponse.json(
        {
          message: "DynamicData re-initialized successfully",
          success: true,
          data: updatedDynamicData,
        },
        {
          status: 200,
        }
      );
    } else {
      // If data doesn't exist, create new DynamicData
      const newDynamicData = new DynamicData({
        categories: [
          "Best Selling",
          "5% Deposit Rate",
          "10% Deposit Rate",
          "Lease Guarantee",
          "Retirement Friendly",
          "Student Rental",
        ],
        hashtags: ["condo", "property", "ontario"],
      });

      const savedDynamicData = await newDynamicData.save();

      return NextResponse.json(
        {
          message: "DynamicData created successfully",
          success: true,
          data: savedDynamicData,
        },
        {
          status: 201,
        }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

// ==============This is the method to get all dunamic data
export async function GET() {
  try {
    const dynamicData = await DynamicData.findOne();
    return NextResponse.json(
      {
        data: dynamicData,
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

// =================This is the method to update the dynamic data and this can only be done by a super-admin(for categories and hashtags)
export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    // console.log("Inside try in update dynamic data");
    const payload: any = getPayloadFromTokenAfterVerification();
    const adminFound = await Admin.findOne({ _id: payload.id });
    // // console.log("This is the admin found", adminFound);
    if (!adminFound) {
      throw {
        message: "No admin found with the provided token",
        statusCode: 400,
      };
    }
    // const id = "65649beaae6a8f2d027c9ff6";
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   throw {
    //     message: "Invalid ID provided in the path params.",
    //     statusCode: 400,
    //   };
    // }
    const reqBody = await req.json();
    // console.log("reqBody before", reqBody);
    const { categories, hashtags, navigationImages, heroSliderImages } =
      reqBody;
    // console.log("reqBody after", reqBody);
    // // console.log("This is the reqBody new one@@$$", reqBody);
    const updatedDynamicData = await DynamicData.findOneAndUpdate(
      {},
      {
        $set: {
          ...(categories && { categories: [...categories] }),
          ...(hashtags && { hashtags: [...hashtags] }),
          ...(heroSliderImages && { heroSliderImages: [...heroSliderImages] }),
          ...(navigationImages && { navigationImages: [...navigationImages] }),
        },
      },
      { new: true }
    );
    // // console.log("updatedDynamicData", updatedDynamicData);

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
