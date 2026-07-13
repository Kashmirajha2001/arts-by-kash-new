import { body } from "express-validator";

export const validateCreateOrder = [
  body("addressId").notEmpty().withMessage("Please select an address."),

  body("paymentMethod")
    .isIn(["razorpay"])
    .withMessage("Invalid payment method."),
];
