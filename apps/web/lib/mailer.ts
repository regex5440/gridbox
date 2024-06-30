"use server";

const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  return fetch(process.env.EMAIL_SERVICE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.EMAIL_SERVICE_TOKEN}`,
    },
    body: JSON.stringify({
      fromService: "GridBox",
      toEmail: to,
      subject,
      html,
      allowReply: true,
    }),
  });
};

export default sendEmail;
