import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { connectDb } from "@/dbConfig/dbConfig";

import { Admin } from "@/models/admin-model";
import { SubscribedUsers } from "@/models/subscribedUsers.model";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/app/utils/api-response";
import { ApiError } from "@/app/utils/api-error";
import { appendUserZodSchema } from "@/app/lib/zodValidations/subscribedUsers/appendUser";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

connectDb();
// =================This is the method to update the dynamic data this will be hit by the website automatically(for updating the users array inside DynamicData)
export const GET = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const { JWT_SECRET } = process.env;
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const token = searchParams.get("token");
  if (!token) {
    throw new ApiError("Token missing in query param", StatusCodes.BAD_REQUEST);
  }
  const decoded = jwt.verify(token, JWT_SECRET!);
  const { userEmail }: any = decoded;
  // ===================checking if user already exists in the db
  const userExists = await SubscribedUsers.findOne({
    users: { $elemMatch: { $eq: userEmail } },
  });

  if (!userExists) {
    throw new ApiError("User do not exist", StatusCodes.BAD_REQUEST);
  }
  const updatedSubscribedUsers = await SubscribedUsers.findOneAndUpdate(
    {},
    {
      $pull: {
        users: userEmail,
      },
    },
    { new: true, upsert: true }
  );
  return ApiResponse(
    `${userEmail}  unsubscribed successfully`,
    StatusCodes.OK,
    null
  );
});
