const adminOrderEmail = ({ order }) => {
  return `
<!DOCTYPE html>

<html>

<body style="font-family:Arial">

<h2>🛒 New Order</h2>

<p>

Order #

${order.orderNumber}

</p>

<p>

Customer:

${order.customer.name}

</p>

<p>

Email:

${order.customer.email}

</p>

<p>

Phone:

${order.customer.phone}

</p>

<hr>

${order.items
  .map(
    (item) => `
<p>

${item.title}

×

${item.quantity}

—

₹${item.price}

</p>
`,
  )
  .join("")}

<hr>

<h3>

Total

₹${order.total}

</h3>

</body>

</html>
`;
};

export default adminOrderEmail;
