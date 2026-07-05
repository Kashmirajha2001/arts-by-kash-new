import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return this.providers.includes("local");
      },
    },

    avatar: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    addresses: [
      {
        street: {
          type: String,
          default: "",
        },

        city: {
          type: String,
          default: "",
        },

        state: {
          type: String,
          default: "",
        },

        pincode: {
          type: String,
          default: "",
        },

        country: {
          type: String,
          default: "India",
        },

        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    providers: {
      type: [String],
      default: ["local"],
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    passwordResetToken: {
      type: String,
    },

    passwordResetExpires: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
