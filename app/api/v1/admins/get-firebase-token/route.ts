import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/Firebase/firebaseClient";
require("dotenv").config();

import jwt from "jsonwebtoken";
import { connectDb } from "@/dbConfig/dbConfig";
import { Admin } from "@/models/admin-model";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { ApiResponse } from "@/app/utils/api-response";
import { StatusCodes } from "http-status-codes";
connectDb();

export const POST = asyncHandler(async function (request: NextRequest) {
  const reqBody = await request.json();
  const firebaseResponse = await signInWithEmailAndPassword(
    auth,
    (reqBody as any).email || "",
    (reqBody as any).password || ""
  );
  const awaitedResponse = await firebaseResponse.user.getIdToken();
  return ApiResponse(
    "Token fetched successfully",
    StatusCodes.OK,
    awaitedResponse
  );
});
