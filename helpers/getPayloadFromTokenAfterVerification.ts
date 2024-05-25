import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { verifyFirebaseToken } from "./verifyFirebaseToken";
import { ApiError } from "@/app/utils/api-error";
import { StatusCodes } from "http-status-codes";
// import { NextResponse } from "next/server";

async function getPayloadFromTokenAfterVerification() {
  const headersList = headers();

  try {
    // // console.log("This is the header list()", headersList);
    let authorization = headersList.get("authorization");
    let token = authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError("No token provided", StatusCodes.UNAUTHORIZED);
    }
    const payload: any = await verifyFirebaseToken(token);

    return payload;
  } catch (error: any) {
    throw { message: error.message, statusCode: error.statusCode };
  }
}

export { getPayloadFromTokenAfterVerification };
