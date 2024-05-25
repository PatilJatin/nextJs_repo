// import { NextResponse } from "next/server";

// export function ApiError(
//   message: string,
//   statusCode: number,
//   data: any = null,
//   errorStack: any = []
// ) {
//   return NextResponse.json(
//     {
//       name: "api-error",
//       message: message || "Internal Server Error",
//       statusCode: statusCode || 500,
//       data,
//       errorStack,
//     },
//     {
//       status: statusCode || 500,
//     }
//   );
// }

class ApiError extends Error {
  statusCode: number;
  data: any;
  errorStack: any;

  constructor(
    message: string,
    statusCode: number,
    data: any = null,
    errorStack: any = []
  ) {
    super(message || "Internal Server Error");
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
    this.errorStack = errorStack;

    // Capture the stack trace, excluding the constructor call from it
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    } else {
      this.stack = new Error().stack;
    }
  }
}

export { ApiError };
