import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    orders,
  });
};

export const updateOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found.",
    });
  }

  order.orderStatus = orderStatus;

  await order.save();

  res.json({
    success: true,
    message: "Order updated.",
    order,
  });
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
