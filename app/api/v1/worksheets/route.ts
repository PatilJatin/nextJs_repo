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

// ==========thiks is the method to create a worksheet in the DB
export const POST = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  // console.log("Inside create worsheets");
  const reqBody = await req.json();
  console.log(reqBody);
  const parsedReqBody = createWorksheetZodSchema.parse(reqBody);
console.log(parsedReqBody);
  const createdWorksheet = await Worksheet.create({
    ...parsedReqBody,
  });

  return ApiResponse(
    "Worksheet created successfully",
    StatusCodes.CREATED,
    createdWorksheet
  );
});

// ================This is the method to find all the worsheets from the DB
export const GET = asyncHandler(async function (req: NextRequest) {
  console.log("Inside fetch all worksheets");
  const allWorksheets = await Worksheet.find();

  return ApiResponse(
    "all worksheets fetched successfully",
    StatusCodes.OK,
    allWorksheets
  );
});
