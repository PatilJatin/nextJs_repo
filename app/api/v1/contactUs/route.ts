import {
  contactUsSchema,
  contactUsSchemaUpdate,
} from "@/app/lib/zodValidations/contactus/contactUs";
import { ApiError } from "@/app/utils/api-error";
import { ApiResponse } from "@/app/utils/api-response";
import { asyncHandler } from "@/app/utils/asyncHandler";
import { connectDb } from "@/dbConfig/dbConfig";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { Admin } from "@/models/admin-model";
import ContactUs from "@/models/contactUs-modetl";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

connectDb();
export const POST = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const reqBody = await req.json();
  const contactBody = contactUsSchema.parse(reqBody);
  const newContactUs = new ContactUs(contactBody);
  const savedInfo = await newContactUs.save();
  return ApiResponse("Contact Us Info saved", StatusCodes.CREATED, savedInfo);
});

export const GET = asyncHandler(async function (
  req: NextRequest,
  res: NextResponse
) {
  const contactInfo = await ContactUs.findOne({});

  return ApiResponse(
    "Contact Info fetch  successfully",
    StatusCodes.OK,
    contactInfo
  );
});

export const PATCH = asyncHandler(
  async (req: NextRequest, res: NextResponse) => {
    const payload: any = await getPayloadFromTokenAfterVerification();
    const adminFound = await Admin.findOne({ firebaseId: payload.uid });
    if (!adminFound) {
      throw new ApiError(
        "No admin found with the provided token",
        StatusCodes.BAD_REQUEST
      );
    }
    const reqBody = await req.json();
    const updateContact = contactUsSchemaUpdate.parse(reqBody);
    const firstContact = await ContactUs.findOne();

    if (!firstContact) {
      throw new ApiError("No contact information found", StatusCodes.NOT_FOUND);
    }

    // Update the first document with the parsed update data
    const updatedInfo = await ContactUs.findByIdAndUpdate(
      firstContact._id,
      updateContact,
      { new: true }
    );
    return ApiResponse(
      "Contact Info update  successfully",
      StatusCodes.OK,
      updatedInfo
    );
  }
);
