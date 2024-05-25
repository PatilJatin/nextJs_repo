import { ApiError } from "@/app/utils/api-error";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { Admin } from "@/models/admin-model";
import Lead from "@/models/lead-model";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async function (
  req: NextRequest,
  { params }: { params: { source: string } },
  res: NextResponse
) {
  const payload: any = await getPayloadFromTokenAfterVerification();
  const adminFound = await Admin.findOne({ firebaseId: payload.uid });
  if (!adminFound) {
    throw new ApiError(
      "No admin found with the provided token",
      StatusCodes.BAD_REQUEST
    );
  }
  const source = params.source;
  const foundLead = await Lead.find({ sourceName: source });
  const resData = {
    count: foundLead.length,
    leads: foundLead,
  };

  return ApiResponse("Lead Fetched successfully", StatusCodes.OK, resData);
});
