import { connectDb } from "@/dbConfig/dbConfig";
import { Worksheet } from "@/models/worksheet-model";
import { NextRequest, NextResponse } from "next/server";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { ZodError } from "zod";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/app/utils/api-error";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { createWorksheetZodSchema } from "@/app/lib/zodValidations/worsheets/createWorksheet";

// =========DB connection
connectDb();

// ================This is the method to filter all the worksheets based on old-to-new
export const GET = asyncHandler(async function (req: NextRequest) {
  // console.log("Inside get all worksheets");
  const allfilteredWorksheets = await Worksheet.find({}).sort({
    createdAt: 1,
  });

  return ApiResponse(
    "all old-to-new worksheets fetched successfully",
    StatusCodes.OK,
    allfilteredWorksheets
  );
});
