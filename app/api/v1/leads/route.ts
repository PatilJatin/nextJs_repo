import { leadZodSchema } from "@/app/lib/zodValidations/leads/createLead";
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

// ================This is the method to create a new lead in the database
export const POST = asyncHandler(async function (req: NextRequest) {
  const reqBody = await req.json();

  const newLeadParesd = leadZodSchema.parse(reqBody);
  console.log("newLeadParesd", newLeadParesd);
  const newLead = new Lead(newLeadParesd);
  const savedLead = await newLead.save();

  return ApiResponse(
    "We'll get back to you in 24 hours.",
    StatusCodes.OK,
    savedLead
  );
});
// ================This is the method to find all the leads from the database
export const GET = asyncHandler(async function (req: NextRequest) {
  // console.log("Inside get all leads");
  const payload: any = await getPayloadFromTokenAfterVerification();
  const adminFound = await Admin.findOne({ firebaseId: payload.uid });
  if (!adminFound) {
    throw new ApiError(
      "No admin found with the provided token",
      StatusCodes.BAD_REQUEST
    );
  }
  const leadGroups = await Lead.aggregate([
    {
      $group: {
        _id: "$sourceName", // Group by sourceName field
        count: { $sum: 1 }, // Count documents in each group
      },
    },
  ]);

  return ApiResponse(
    "All leads fetched Succesfully",
    StatusCodes.OK,
    leadGroups
  );
});
