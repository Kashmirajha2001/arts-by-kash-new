import sendEmail from "./sendEmail.js";

import orderConfirmationEmail from "../templates/orderConfirmationEmail.js";

import adminOrderEmail from "../templates/adminOrderEmail.js";

export default async function sendOrderEmails(order) {
  try {
    await sendEmail({
      to: order.customer.email,
      subject: `Your Arts by Kash Order #${order.orderNumber}`,
      html: orderConfirmationEmail({ order }),
    });
  } catch (err) {
    console.error("Customer email failed:", err);
  }

  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `🛒 New Order ${order.orderNumber}`,
      html: adminOrderEmail({ order }),
    });
  } catch (err) {
    console.error("Admin email failed:", err);
  }
}
