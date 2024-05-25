import { adminAuth } from "@/Firebase/firebase";
import { forgotPasswordZodSchema } from "@/app/lib/zodValidations/admins/forgotPassword";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { AWS } from "@/app/api/v1/aws/aws.helper";

import { ApiError } from "@/app/utils/api-error";
import { Admin } from "@/models/admin-model";
import { connectDb } from "@/dbConfig/dbConfig";
import juice from "juice";
import { getFormattedEmailContent } from "@/helpers/admins.helper/getFormattedEmailContent";
import { Html } from "next/document";

connectDb();
// ==============extracting environment variables
const {
  ACCESS_KEY,
  SECRET_KEY,
  REGION,
  BUCKET_NAME,
  SOURCE_EMAIL,
  DESTINATION_EMAIL,
  JWT_SECRET,
} = process.env;

export const POST = asyncHandler(async function (req: NextRequest) {
  console.log("Inside forgot password");
  const reqBody = await req.json();
  const { email } = forgotPasswordZodSchema.parse(reqBody);

  console.log("Before@@");
  const userRecordInFirebase = await adminAuth.getUserByEmail(email);
  const userRecordInDB = await Admin.findOne({ email });
  if (!userRecordInDB) {
    throw new ApiError(`${email} do not exist in DB`, StatusCodes.BAD_REQUEST);
  }
  console.log("JWT_SECRET", JWT_SECRET);
  const token = jwt.sign({ email }, JWT_SECRET!, {
    expiresIn: "15m",
  });

  const emailBody = getFormattedEmailContent(token);

  // Inline CSS styles into HTML elements
  const inlinedEmailBody = juice(emailBody);
  console.log("After token generation ", token);
  // Send email with reset link
  const mailOptions = {
    Source: SOURCE_EMAIL!,
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: "Password Reset" },
      Body: {
        Html: {
          Data: inlinedEmailBody,
        },
      },
    },
  };

  // ================Creating SES object
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  console.log("Before sendemail");
  const returnedData = await ses.sendEmail(mailOptions).promise();
  console.log("After sendemail");

  return ApiResponse(
    `password reset email sent to ${email}`,
    StatusCodes.OK,
    returnedData
  );
});
