// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/dbConfig/dbConfig";
import { Admin } from "@/models/admin-model";

// Define a custom type by extending NextRequest to include locals
interface CustomNextRequest extends NextRequest {
  locals: {
    decodedToken?: any; // Add your decoded token type here
  };
}

// Connect to the database
connectDb();

// Middleware function to verify JWT token
const verifyToken = async (request: CustomNextRequest) => {
  try {
    // Get the token from the Authorization header or cookies
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    // console.log(token);

    // If no token is provided, return an error response
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    // Verify the token using the same secret key used during login
    const secretKey = "01605A@cluster001605A@cluster0";
    // const secretKey = process.env.TOKEN_SECRET;

    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded token data to the request for further use if needed
    request.locals = {
      ...request.locals,
      decodedToken: decoded,
    };

    return null; // Proceed with the next middleware or route handler
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid token" },
      { status: 401 }
    );
  }
};

// Route to check if JWT token is valid
export async function GET(request: CustomNextRequest) {
  try {
    // Use the middleware to verify the token before processing the request
    const middlewareResponse = await verifyToken(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    // If the token is valid, you can access the decoded token data
    const decodedToken = request.locals.decodedToken;

    // Additional logic can be added here based on the decoded token data
    // For example, you can check if the user associated with the token exists in the database

    return NextResponse.json(
      { message: "Token is valid", decodedToken },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
