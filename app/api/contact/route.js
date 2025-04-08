// app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail", // or use your own SMTP server
    auth: {
      user: process.env.SMTP_USER, // your SMTP user
      pass: process.env.SMTP_PASS, // your SMTP password
    },
  });

  await transporter.sendMail({
    from: `"Albazar Auto Contact" <${process.env.SMTP_USER}>`,
    to: "info@albazarauto.nl",
    subject: "Nieuw contactbericht via AlbazarAuto.nl",
    html: `
      <p><strong>Naam:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Bericht:</strong><br/>${message}</p>
    `,
  });

  return new Response(JSON.stringify({ success: true }));
}
