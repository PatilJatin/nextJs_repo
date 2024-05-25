import { NextResponse } from "next/server";

export function ApiResponse(message: string, statusCode: number, data: any) {
  return NextResponse.json(
    {
      message,
      statusCode,
      data,
    },
    {
      status: statusCode,
    }
  );
}
