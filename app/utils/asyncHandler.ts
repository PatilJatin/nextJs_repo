// asyncHandler.js
import { ZodError } from "zod";
import { ApiError } from "./api-error";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

export function asyncHandler(controllerAction: any) {
  return async (req: any, res: any) => {
    try {
      return await controllerAction(req, res);
    } catch (error: any) {
      console.log("Inside error of asynchandler", error.code);
      let message: string = error.message;
      let statusCode = error.statusCode;
      let errorStack;
      if (error instanceof ZodError) {
        errorStack = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Validation Error";
      } else if (error.code === "auth/email-already-exists") {
        message = `Firebase error: ${message}`;
        statusCode = StatusCodes.CONFLICT;
      }

      return NextResponse.json(
        {
          name: "api-error",
          message: message || "Internal Server Error",
          statusCode: statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
          data: error.data || null,
          errorStack: errorStack || error.errorStack || [],
        },
        {
          status: statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        }
      );
    }
  };
}
