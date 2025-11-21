import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      default: "#3b82f6", // fallback brand color
    },

    category: {
      type: String,
      enum: [
        "Social",
        "Video",
        "Design",
        "Streaming",
        "Productivity",
        "Entertainment",
        "Shopping",
        "Music",
        "Other",
      ],
      default: "Other",
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Avoid model re-compilation errors in Next.js hot reload
export default mongoose.models.Password ||
  mongoose.model("Password", PasswordSchema);
