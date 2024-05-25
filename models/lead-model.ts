import mongoose from "mongoose";
const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const leadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      tolowerCase: true,
    },
    query: {
      type: String,
      required: true,
    },
    sourceName: {
      type: String,
      required: true,
      enum: ["contact us", "projects"],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export default Lead;
