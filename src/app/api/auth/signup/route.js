import { NextResponse } from "next/server";
import { validateReqFields } from "../../../../backend/utils/validateFields";
import { User } from "../../../../backend/schema/userSchema.js";
import bcrypt from "bcrypt";
import { sendAccountActivationEmail } from "../../../../backend/nodemailer/index.js";
import connectDB from "../../../../backend/config/db/db.js";

export const POST = async (req, res) => {
  await connectDB();

  try {
    const reqBody = await req.json();
    const { name, email, contact, password, confirm_password } = reqBody;
    const isValidate = validateReqFields(reqBody, [
      "name",
      "email",
      "contact",
      "password",
      "confirm_password",
    ]);

    if (!isValidate.success) {
      return NextResponse.json(
        {
          message: isValidate.message,
        },
        { status: 400, success: false }
      );
    }

    if (password !== confirm_password) {
      return NextResponse.json(
        { message: "password not match." },
        { status: 203 }
      );
    }

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          message: "user already exist",
          status: true,
        },
        { status: 200, success: false }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    await sendAccountActivationEmail(email, res);
    const newUser = await User.create({
      name,
      email,
      contact,
      password: encryptedPassword,
    });
    await newUser.save();

    return NextResponse.json(
      {
        user,
        message:
          "account created successfully and an email sent to your account for further process pls check your inbox",
        status: true,
      },
      { status: 200, success: false }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500, success: false }
    );
  }
};
