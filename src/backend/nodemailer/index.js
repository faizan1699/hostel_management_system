import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const admin = process.env.ADMIN;
const pass = process.env.PASS;

export const sendAccountActivationEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: admin,
        pass: pass,
      },
    });
    const mailOption = {
      from: admin,
      to: email,
      subject: "Account activation",
      html: `
<div
  style="
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #495a8aff, #9d9ea1ff);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 40px 0;
  "
>
  <div
    style="
      background: rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      max-width: 600px;
      width: 90%;
      justify-content:center;
    "
  >
    <h2
      style="
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: #ffffff;
      "
    >
      🏨 Hostel Management System
    </h2>

    <hr
      style="
        margin: 20px 0;
        border: 1px solid rgba(255, 255, 255, 0.2);
      "
    />

    <p
      style="
        font-size: 1.1rem;
        margin-bottom: 25px;
        line-height: 1.6;
      "
    >
      Your account is currently inactive. Please contact the project manager
      for activation.
    </p>

    <br />
    <h3>
      <a
        href="https://wa.me/923038019169"
        target="_blank"
        style="
          color: white;
          background: #25d366;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
        "
      >
        💬 Contact Project Manager on WhatsApp
      </a>
    </h3>

    <br />

    <h1
      style="
        font-size: 1.1rem;
        line-height: 1.7;
        font-weight: 500;
        color: #fff;
      "
    >
      Please contact the Project Manager at: <br />
      📞 +92 303 8019169 <br />
      Direct message on WhatsApp for account activation or email at:
      <br />
      📧 faizanrasheed169@gmail.com
    </h1>

    <br />
    <hr
      style="
        margin: 20px 0;
        border: 1px solid rgba(255, 255, 255, 0.2);
      "
    />

    <footer
      style="
        margin-top: 10px;
        font-size: 0.9rem;
        opacity: 0.8;
      "
    >
      © 2025 Hostel Management System | All Rights Reserved
    </footer>
  </div>
</div>
    
    `,
    };

    console.log("mail send");
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log("mail not send", error.message);
  }
};
