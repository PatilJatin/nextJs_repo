import { adminAuth } from "@/Firebase/firebase";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { AWS } from "@/app/api/v1/aws/aws.helper";

import { ApiError } from "@/app/utils/api-error";
import { Admin } from "@/models/admin-model";
import { resetPasswordZodSchema } from "@/app/lib/zodValidations/admins/resetPassword";
import juice from "juice";
import { getFormattedEmailContent } from "@/helpers/admins.helper/getFormattedEmailContentForPwdChanged";

const { JWT_SECRET, REGION, SECRET_KEY, ACCESS_KEY, SOURCE_EMAIL } =
  process.env;
export const POST = asyncHandler(async function (req: NextRequest) {
  console.log("Inside reset password");
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const token = searchParams.get("token");
  if (!token) {
    throw new ApiError("Token missing in query param", StatusCodes.BAD_REQUEST);
  }
  const decoded = jwt.verify(token, JWT_SECRET!);
  const { email }: any = decoded;
  const reqBody = await req.json();
  const { newPassword } = resetPasswordZodSchema.parse(reqBody);

  // Retrieve the user from Firebase Authentication
  const userRecordInFirebase = await adminAuth.getUserByEmail(email);

  // Retrieve the user from Db
  const userRecordInDB = await Admin.findOne({ email });
  if (!userRecordInDB) {
    throw new ApiError(`${email} do not exist in DB`, StatusCodes.BAD_REQUEST);
  }
  // Reset password using Firebase Authentication
  console.log("Before update");
  await adminAuth.updateUser(userRecordInFirebase.uid, {
    password: newPassword,
  });
  console.log("After update");

  const emailBody = getFormattedEmailContent();

  // Inline CSS styles into HTML elements
  const inlinedEmailBody = juice(emailBody);
  const mailOptions = {
    Source: SOURCE_EMAIL!,
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: "Password Changed" },
      Body: {
        Html: {
          Data: inlinedEmailBody,
        },
      },
    },
  };

  // ================Creating SES object
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const returnedData = await ses.sendEmail(mailOptions).promise();

  return ApiResponse(
    `password changed successfully `,
    StatusCodes.OK,
    returnedData
  );
});
