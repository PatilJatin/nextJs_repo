// models/auditLog.js
const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  updatedByAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  changes: [
    {
      fieldChanged: String,
      oldValue: String,
      newValue: String,
    },
  ],
});

const AuditLog =
  mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);

export { AuditLog };
