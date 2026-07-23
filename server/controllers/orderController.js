import Order from "../models/Order.js";

// console.log("Model:", Order.modelName);

// console.log("Items path:", Order.schema.path("items"));

// console.log("Instance:", Order.schema.path("items").instance);

// console.log("Schema:", Order.schema.path("items").schema);

import User from "../models/User.js";

import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Product from "../models/Product.js";

import products from "../data/products.js";

export const createOrder = async (req, res) => {
  try {
    const { addressId, giftMessage, paymentMethod } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }
    const shippingAddress = user.addresses.id(addressId);

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address not found.",
      });
    }

    const orderItems = [];

    let subtotal = 0;

    for (const item of user.cart) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found.`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} is out of stock.`,
        });
      }

      orderItems.push({
        productId: product.id,

        title: product.title,

        image: product.image[0],

        type: product.type,

        quantity: item.quantity,

        price: product.price,
      });

      subtotal += product.price * item.quantity;
    }

    const shippingCharge = subtotal >= 3000 ? 0 : 150;

    const total = subtotal + shippingCharge;
    // console.log("orderItems =", orderItems);
    // console.log("Array?", Array.isArray(orderItems));
    // console.log("First item =", orderItems[0]);
    const order = await Order.create({
      user: user._id,

      items: orderItems, // ✅ NOT [orderItems]

      shippingAddress,

      customer: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },

      giftMessage,

      subtotal,

      shippingCharge,

      total,

      paymentMethod,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100,

      currency: "INR",

      receipt: order._id.toString(),
    });

    order.razorpayOrderId = razorpayOrder.id;

    await order.save();
    res.status(201).json({
      success: true,

      orderId: order._id,

      razorpayOrderId: razorpayOrder.id,

      amount: razorpayOrder.amount,

      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature.",
      });
    }
    order.paymentStatus = "paid";

    order.orderStatus = "confirmed";

    order.razorpayPaymentId = razorpay_payment_id;

    order.razorpaySignature = razorpay_signature;

    await order.save();
    const user = await User.findById(order.user);

    user.cart = [];

    await user.save();
    res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch orders.",
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch order.",
    });
  }
};
