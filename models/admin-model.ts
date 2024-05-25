import mongoose from "mongoose";
const validateEmail = function (email: any) {
  var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
};
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [53, "name should be under 53 Characters"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
   
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],

  isActive: {
    type: Boolean,
    default: true,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  firebaseId: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export { Admin };
