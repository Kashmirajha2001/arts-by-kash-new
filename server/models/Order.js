import mongoose from "mongoose";

// ================= Order Item =================
const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

// ================= Shipping Address =================
const shippingAddressSchema = new mongoose.Schema(
  {
    label: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  { _id: false },
);

// ================= Customer =================
const customerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    shippingAddress: shippingAddressSchema,

    customer: customerSchema,

    giftMessage: {
      type: String,
      default: "",
    },

    subtotal: Number,

    shippingCharge: Number,

    total: Number,

    paymentMethod: {
      type: String,
      default: "razorpay",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "packed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    razorpayOrderId: String,

    razorpayPaymentId: String,

    razorpaySignature: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
