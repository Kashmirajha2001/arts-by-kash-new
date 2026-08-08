const orderConfirmationEmail = ({ order }) => {
  const courseItems = order.items.filter((item) => item.type === "course");

  const artworkItems = order.items.filter((item) => item.type === "artwork");

  return `
<!DOCTYPE html>
<html>

<body style="font-family:Arial;background:#f6f3ef;padding:40px;">

<div style="
max-width:700px;
margin:auto;
background:white;
border-radius:18px;
overflow:hidden;
box-shadow:0 12px 40px rgba(0,0,0,.08);
">

<div style="padding:35px;text-align:center;border-bottom:1px solid #eee;">

<img
src="https://artsbykash.com/logo.png"
width="170"
/>

<h2>Thank you for your purchase ❤️</h2>

<p>
Order #${order.orderNumber}
</p>

</div>

<div style="padding:30px;">

<h3>Order Summary</h3>

${order.items
  .map(
    (item) => `
<div style="
display:flex;
align-items:center;
gap:16px;
margin-bottom:20px;
">

<img
src="${item.image}"
width="70"
style="
border-radius:10px;
border:1px solid #ddd;
"
/>

<div>

<div style="font-weight:600;">
${item.title}
</div>

<div>
Qty: ${item.quantity}
</div>

<div>
₹${item.price}
</div>

</div>

</div>
`,
  )
  .join("")}

<hr>

<p>

<strong>Total Paid:</strong>

₹${order.total}

</p>

<p>

<strong>Payment:</strong>

${order.paymentMethod}

</p>

<p>

<strong>Status:</strong>

${order.paymentStatus}

</p>

${
  courseItems.length
    ? `
<hr>

<h3>🎓 Course Access</h3>

<p>
Your course has been unlocked.
</p>

<a
href="https://artsbykash.com/my-courses"
style="
background:#3d2d23;
color:white;
padding:14px 24px;
display:inline-block;
border-radius:10px;
text-decoration:none;
margin-top:15px;
">
Go To My Courses
</a>
`
    : ""
}

${
  artworkItems.length
    ? `
<hr>

<h3>🎨 Artwork</h3>

<p>
Your artwork order has been received and we'll begin working on it shortly.
</p>
`
    : ""
}

</div>

</div>

</body>

</html>
`;
};

export default orderConfirmationEmail;
