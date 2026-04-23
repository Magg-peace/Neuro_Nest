import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    if(!process.env.EMAIL_USER || process.env.EMAIL_USER === 'yourgmail@gmail.com') {
      console.log(`[STUB] Email would be sent to: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${html.substring(0, 50)}...`);
      return;
    }

    await transporter.sendMail({
      from: `"NeuroNest" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log("Email sent successfully to", to);
  } catch (err) {
    console.error("Email error:", err);
  }
};
