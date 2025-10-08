import { NextResponse } from "next/server";
import connectDB from "../../../../backend/config/db/db";
import { User } from "../../../../backend/schema/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  connectDB();
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    if (!email || !password) {
      return NextResponse.json(
        { message: "pls check your email or password" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid password" },
        { status: 400 }
      );
    }

    const data = {
      name: user.name,
      email: user.email,
      id: user._id,
      is_verified: user.is_verified,
      contact: user.contact,
    };

    if (!user.is_verified) {
      return NextResponse.json(
        {
          message:
            "Your account is not activated yet pls contact admin to activate your account.",
        },
        { status: 400 }
      );
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Login successful", status: true, user: data, token },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: error.message, status: false },
      { status: 500 }
    );
  }
};
