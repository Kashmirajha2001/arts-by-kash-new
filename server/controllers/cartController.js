import User from "../models/User.js";

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      cart: user.cart || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const id = Number(productId);

    const user = await User.findById(req.user._id);

    const existing = user.cart.find((item) => item.productId === id);

    if (existing) {
      existing.quantity += 1;
    } else {
      user.cart.push({
        productId: id,
        quantity: 1,
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to cart.",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const id = Number(productId);

    const user = await User.findById(req.user._id);

    const item = user.cart.find((item) => item.productId === id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    item.quantity = quantity;

    await user.save();

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const id = Number(req.params.productId);

    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter((item) => item.productId !== id);

    await user.save();

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.cart = [];

    await user.save();

    res.status(200).json({
      success: true,
      cart: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
