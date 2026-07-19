import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["artwork", "print", "course"],
      required: true,
    },

    category: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 1,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    badge: {
      type: String,
      default: "",
    },

    medium: String,

    size: String,

    frame: String,

    availability: String,

    description: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
