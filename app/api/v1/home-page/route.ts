import { updateHomePageZodSchema } from "@/app/lib/zodValidations/homePage/updateHomePage";
import { ApiError } from "@/app/utils/api-error";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { Admin } from "@/models/admin-model";
import { HomePage } from "@/models/homePage.model";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";

// establishing DB conection
connectDb();

// =========MEthod to fetch all home page stuff
export const GET = asyncHandler(async function (req: NextRequest) {
  // let homePageStuff = await HomePage.findOne().select("-_id ");
  let homePageStuff = await HomePage.findOne(
    {},
    { _id: 0, "socialLinks._id": 0 } //==========Doing this because there is no point in sending _id
  );

  if (!homePageStuff) {
    homePageStuff = await HomePage.create({});
  }

  return ApiResponse(
    "All home page stuff fetched Succesfully",
    StatusCodes.OK,
    homePageStuff
  );
});

// Method to update home page stuff
export const PATCH = asyncHandler(async function (req: NextRequest) {
  const payload: any = await getPayloadFromTokenAfterVerification();
  const adminFound = await Admin.findOne({ firebaseId: payload.uid });
  if (!adminFound) {
    throw new ApiError(
      "No admin found with the provided token",
      StatusCodes.BAD_REQUEST
    );
  }
  let foundHomePage = await HomePage.findOne();
  if (!foundHomePage) {
    foundHomePage = await HomePage.create({});
  }

  const reqBody = await req.json();
  const parsedReqBody = updateHomePageZodSchema.parse(reqBody);

  const updatedPrivacyPolicy = await HomePage.findOneAndUpdate(
    {},
    parsedReqBody,
    {
      new: true,
    }
  );

  return ApiResponse(
    "Home page stuff updated successfully",
    StatusCodes.OK,
    updatedPrivacyPolicy
  );
});
