import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: String,
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
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
    ],

    shippingAddress: {
      name: String,
      email: String,
      phone: String,

      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },

    giftMessage: {
      type: String,
      default: "",
    },

    subtotal: Number,

    shipping: Number,

    total: Number,

    paymentMethod: {
      type: String,
      default: "razorpay",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
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
