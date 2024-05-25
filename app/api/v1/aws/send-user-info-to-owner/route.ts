import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";
import { AWS, sendEmailFuntion } from "@/app/api/v1/aws/aws.helper";
import juice from "juice";

import { userInfoZodSchema } from "@/app/lib/zodValidations/aws/userInfo";
import { getFormattedEmailContentForOwner } from "@/helpers/aws.helper/getFormattedEmailContentForOwner";
import { getFormattedEmailContentForUser } from "@/helpers/aws.helper/getFormattedEmailContentForUser";
const {
  ACCESS_KEY,
  SECRET_KEY,
  REGION,
  BUCKET_NAME,
  SOURCE_EMAIL,
  DESTINATION_EMAIL,
} = process.env;

// ============This is the method to send an email to the owner with the contact info of the user
export const POST = asyncHandler(async function (req: NextRequest) {
  const reqBody = await req.json();
  const parsedReqBody = userInfoZodSchema.parse(reqBody);

  // ================Creating SES object
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });

  const emailBodyForOwner = getFormattedEmailContentForOwner(parsedReqBody);
  const emailBodyForUser = getFormattedEmailContentForUser(parsedReqBody);

  // Inline CSS styles into HTML elements
  const inlinedEmailBodyForOwner = juice(emailBodyForOwner);
  const inlinedEmailBodyForUser = juice(emailBodyForUser);

  // =====================Sending email
  console.log("Before sendEmailfuntion");

  const returnedDataOfMailSentToOwner = await sendEmailFuntion(
    [DESTINATION_EMAIL!, "rounak@furation.tech"],
    inlinedEmailBodyForOwner,
    "User's Contact Info"
  );
  const returnedDataOfMailSentToUser = await sendEmailFuntion(
    [DESTINATION_EMAIL!, parsedReqBody.email],
    inlinedEmailBodyForUser,
    "Thanks for contacting us..."
  );
  console.log("After sendEmailfuntion");
  return ApiResponse(
    "user's contact info sent successfully to the owner's email and a thank you mail also sent to the user",
    StatusCodes.OK,
    {
      returnedDataOfMailSentToOwner,
      returnedDataOfMailSentToUser,
    }
  );
});
