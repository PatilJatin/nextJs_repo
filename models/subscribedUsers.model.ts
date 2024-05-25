import mongoose, { Schema } from "mongoose";

const subscribedUsersSchema = new Schema({
  users: [
    {
      type: String,
      unique: true,
    },
  ],
});

// ========================making the model here
const SubscribedUsers =
  mongoose.models.SubscribedUsers ||
  mongoose.model("SubscribedUsers", subscribedUsersSchema);

// =========================Exporting the model
export { SubscribedUsers };
