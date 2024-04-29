"use server";
import { createTransport } from "nodemailer";

const mailTransporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 *
 * @param param.to Email address of recipient
 * @param param.subject Subject line of the Email
 * @param param.html HTML body of the email
 * @param param.sender Sender info @default sender Chit-Chat <${process.env.EMAIL_USERNAME}>
 * @returns
 */
const sendEmail = ({
  to,
  subject,
  sender = `${process.env.EMAIL_FROM || "info"} <${process.env.EMAIL_USERNAME}>`,
  html,
}: {
  to: string;
  subject: string;
  sender?: string;
  html: string;
}) => {
  return mailTransporter.sendMail({
    from: sender,
    to,
    subject,
    html,
  });
};

export default sendEmail;
