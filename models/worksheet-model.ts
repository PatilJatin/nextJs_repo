import mongoose, { Schema } from "mongoose";
import { number } from "zod";

const worksheetSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
    },
    addressLine1: {
      type: String,
    },
    city: {
      type: String,
    },
    provinceName: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
    },
    dob: {
      type: String,
    },
    email: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    sin: {
      type: String,
    },
    employerName: {
      type: String,
    },
    suiteChoice1: {
      type: {
        floorPlan: String,
        floorName: String,
      },
    },
    suiteChoice2: {
      type: {
        floorPlan: String,
        floorName: String,
      },
    },
    suiteChoice3: {
      type: {
        floorPlan: String,
        floorName: String,
      },
    },

    is2ndPurchaser: {
      type: Boolean,
      default: false,
    },
    firstNameOf2ndPurchaser: {
      type: String,
      default: null,
    },
    lastNameOf2ndPurchaser: {
      type: String,
      default: null,
    },
    streetAddressOf2ndPurchaser: {
      type: String,
      default: null,
    },
    addressLine1Of2ndPurchaser: {
      type: String,
      default: null,
    },
    cityOf2ndPurchaser: {
      type: String,
      default: null,
    },
    provinceNameOf2ndPurchaser: {
      type: String,
      default: null,
    },
    postalCodeOf2ndPurchaser: {
      type: Number,
      default: null,
    },
    phoneNumberOf2ndPurchaser: {
      type: Number,
      default: null,
    },
    dobOf2ndPurchaser: {
      type: String,
      default: null,
    },
    emailOf2ndPurchaser: {
      type: String,
      default: null,
    },
    jobTitleOf2ndPurchaser: {
      type: String,
      default: null,
    },
    sinOf2ndPurchaser: {
      type: String,
      default: null,
    },
    employerNameOf2ndPurchaser: {
      type: String,
      default: null,
    },
    investorOrEndUser: {
      type: String,
      enum: ["Investor", "End user"],
    },
    hasOptedForParking: {
      type: String,
      enum: ["Yes", "No", "Not Applicable"],
    },
    hasOptedForLocker: {
      type: String,
      enum: ["Yes", "No", "Not Applicable"],
    },
    notes: {
      type: String,
    },
    dlOrPassport: [
      {
        filename: String,
        link: String,
      },
    ],
    salesPerson: {
      type: String,
    },
    isCanadianCitizen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ========================making the model here
const Worksheet =
  mongoose.models.Worksheet || mongoose.model("Worksheet", worksheetSchema);

// =========================Exporting the model
export { Worksheet };
