import { ApiError } from "@/app/utils/api-error";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { Admin } from "@/models/admin-model";
import Lead from "@/models/lead-model";
import { StatusCodes } from "http-status-codes";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// ================This is the method to filter projects based on the filter object being provided from the frontend

export const GET = asyncHandler(async function (request: NextRequest) {
  const payload: any = await getPayloadFromTokenAfterVerification();
  const adminFound = await Admin.findOne({ firebaseId: payload.uid });
  if (!adminFound) {
    throw new ApiError(
      "No admin found with the provided token",
      StatusCodes.BAD_REQUEST
    );
  }
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const sourceName = searchParams.get("source");
  console.log(query);
  let filterCriteria: any = {};
  if (sourceName) {
    filterCriteria.sourceName = sourceName;
  }
  let sortCriteria = {};
  if (query === "newest to oldest") {
    sortCriteria = { createdAt: -1 };
  } else if (query === "oldest to newest") {
    sortCriteria = { createdAt: 1 };
  }
  const leads = await Lead.find(filterCriteria).sort(sortCriteria);
  const response = {
    totalleads: leads.length,
    data: leads,
  };
  return ApiResponse("Author Fetch succesfully", StatusCodes.OK, response);
});
