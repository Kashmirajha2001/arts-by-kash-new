import Order from "../models/Order.js";

export const getMyOrders = async (req, res) => {};

export const getOrderById = async (req, res) => {};

export const createOrder = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user.cart.length) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    const {
      addressId,
      giftMessage,
      paymentMethod,
    } = req.body;

    // next...

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};