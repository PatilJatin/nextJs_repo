import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { connectDb } from "@/dbConfig/dbConfig";
import { AWS } from "@/app/api/v1/aws/aws.helper";
import jwt from "jsonwebtoken";
import { Admin } from "@/models/admin-model";
import { SubscribedUsers } from "@/models/subscribedUsers.model";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/app/utils/api-response";
import { ApiError } from "@/app/utils/api-error";
import { appendUserZodSchema } from "@/app/lib/zodValidations/subscribedUsers/appendUser";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import juice from "juice";
import { getFormattedEmailContent } from "@/helpers/subscribedUsers.helper/getFormattedEmailContent";
import { config } from "dotenv";
config();
connectDb();
// =================This is the method to append user in subscribed users array, this will be hit when a user subscribes on our platform
export const PATCH = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const { SOURCE_EMAIL, JWT_SECRET } = process.env;
  const reqBody = await req.json();
  const { userEmail } = appendUserZodSchema.parse(reqBody);
  // ===================checking if user already exists in the db
  const userExists = await SubscribedUsers.findOne({
    users: { $elemMatch: { $eq: userEmail } },
  });

  console.log("Userexists##################", userExists);
  if (userExists) {
    // throw {
    //   message: "user already exists",
    //   statusCode: 2,
    // };
    return ApiResponse(
      `${userEmail} subscribed already`,
      StatusCodes.OK,
      userExists
    );
  }
  const token = jwt.sign({ userEmail }, JWT_SECRET!, {
    // expiresIn: "1h",
  });
  console.log("Unique user came that is why going to update");
  const formattedEmail = getFormattedEmailContent(token);
  // Inline CSS styles into HTML elements
  const inlinedEmailBody = juice(formattedEmail);
  const mailOptions = {
    Source: SOURCE_EMAIL!, //=================It is there in .env
    Destination: { ToAddresses: [userEmail] }, //=====Should be a verified email till the time of production
    Message: {
      Subject: { Data: "Subscription Confirmation" },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: inlinedEmailBody,
        },
      },
    },
  };

  // =============Sending mail to the user with an unsubscribe button so that he can unsubscribe if he wants
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const returnedData = await ses.sendEmail(mailOptions).promise();

  const updatedSubscribedUsers = await SubscribedUsers.findOneAndUpdate(
    {},
    {
      $push: {
        users: userEmail,
      },
    },
    { new: true, upsert: true }
  );
  return ApiResponse(
    `${userEmail} subscribed successfully`,
    StatusCodes.OK,
    updatedSubscribedUsers
  );
});
