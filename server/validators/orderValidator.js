import { body } from "express-validator";

export const validateCreateOrder = [
  body("addressId").notEmpty().withMessage("Shipping address is required."),

  body("paymentMethod")
    .equals("razorpay")
    .withMessage("Invalid payment method."),
];
