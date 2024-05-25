import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    developerName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    neighborhood: {
      type: String,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    numberOfStoreys: {
      type: Number,
      required: true,
    },
    numberOfUnits: {
      type: Number,
      required: true,
    },
    occupancyDate: {
      type: String,
      required: true,
    },
    maintenanceFees: {
      type: Number,
      required: true,
    },
    // ===Need confirmation on this
    pricedFrom: {
      type: Number,
      required: true,
    },
    hashtags: [
      {
        type: String,
      },
    ],

    categories: [
      {
        type: String,
      },
    ],
    closingIn: {
      type: Number,
      enum: [-1, 12, 1, 2, 3, 4, 5, 6],
      required: true,
    },
    overViewImages: [
      {
        type: String,
        required: true,
      },
    ],
    city: {
      type: String,
      required: false,
    },
    // country: {
    //   type: String,
    // },

    // ===========addded by me
    releaseDate: {
      type: String,
      required: true,
    },

    aboutProject: {
      type: String,
      required: true,
    },
    aboutImages: [
      {
        type: String,
        required: true,
      },
    ],

    featuresAndFinishes: {
      type: String,
      required: true,
    },
    featureImages: [
      {
        type: String,
        required: true,
      },
    ],
    aboutDeveloper: {
      type: String,
      required: true,
    },
    developerImages: [
      {
        type: String,
        required: true,
      },
    ],
    attachments: [
      {
        title: String,
        location: String,
      },
    ],
    faqs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FAQ",
      },
    ],
    uploadedByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    auditLogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuditLog",
      },
    ],
    isSingleFamilyHomeProject: {
      type: Boolean,
      default: false,
    },
    isUpcomingProject: {
      type: Boolean,
      default: false,
    },
    isLaunchedRecently: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export { Project };
