import { Resend } from "resend";

console.log(process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  await resend.emails.send({
    from: "Arts by Kash <hello@artsbykash.com>",
    to,
    subject,
    html,
  });
};

export default sendEmail;