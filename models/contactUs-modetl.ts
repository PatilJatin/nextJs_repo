import mongoose from "mongoose";

// Validate email function
const validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// Contact Us Schema
const contactUsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create ContactUs model
const ContactUs =
  mongoose.models.ContactUs || mongoose.model("ContactUs", contactUsSchema);

export default ContactUs;
