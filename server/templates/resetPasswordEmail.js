const resetPasswordEmail = (name, resetLink) => {
  return `
  <div style="font-family:Arial,sans-serif;padding:40px;background:#faf8f5;">
      <div style="max-width:600px;margin:auto;background:white;padding:40px;border-radius:16px;">
          <h2 style="color:#7b5c3f;">
              🎨 Arts by Kash
          </h2>

          <p>Hi <strong>${name}</strong>,</p>

          <p>
              We received a request to reset your password.
          </p>

          <p>
              Click the button below to choose a new password.
          </p>

          <a
            href="${resetLink}"
            style="
                display:inline-block;
                margin-top:20px;
                background:#7b5c3f;
                color:white;
                padding:14px 28px;
                text-decoration:none;
                border-radius:8px;
            "
          >
            Reset Password
          </a>

          <p style="margin-top:35px;">
              This link expires in <strong>15 minutes</strong>.
          </p>

          <p>
              If you didn't request this,
              simply ignore this email.
          </p>

          <hr style="margin:30px 0;" />

          <small>
              Arts by Kash
          </small>
      </div>
  </div>
  `;
};

export default resetPasswordEmail;
