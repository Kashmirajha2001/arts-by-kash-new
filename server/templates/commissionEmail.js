const commissionEmail = ({
  name,
  email,
  phone,
  medium,
  size,
  people,
  price,
  message,
  images,
}) => {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family:Arial,sans-serif;background:#f7f7f7;padding:40px;">

        <div style="
          max-width:650px;
          margin:auto;
          background:#ffffff;
          border-radius:16px;
          overflow:hidden;
          box-shadow:0 8px 24px rgba(0,0,0,.08);
        ">

          <div style="padding:30px;text-align:center;border-bottom:1px solid #eee;">
            <img
              src="https://artsbykash.com/logo-email.png"
              width="170"
              alt="Arts by Kash"
            />

            <h2 style="margin-top:20px;">
              🎨 New Commission Request
            </h2>
          </div>

          <div style="padding:30px;">

            <h3>Customer Details</h3>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Phone:</strong> ${phone || "-"}</p>

            <hr>

            <h3>Artwork Details</h3>

            <p><strong>Medium:</strong> ${medium}</p>

            <p><strong>Size:</strong> ${size}</p>

            <p><strong>People:</strong> ${people}</p>

            <p><strong>Estimated Price:</strong> ${
              price === "null" || price === null
                ? "Custom Quote"
                : `₹${Number(price).toLocaleString("en-IN")}`
            }</p>

            <hr>

            <h3>Additional Details</h3>

            <p>${message || "No message provided."}</p>

            <hr>

            <h3>Reference Images</h3>

            ${images
              .map(
                (image) => `
                <img
                  src="${image}"
                  width="170"
                  style="
                    margin:8px;
                    border-radius:10px;
                    border:1px solid #ddd;
                  "
                />
              `
              )
              .join("")}

          </div>

        </div>

      </body>
    </html>
  `;
};

export default commissionEmail;