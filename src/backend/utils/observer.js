import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export const observer = async (req) => {
  const token = await req.cookies.token;
  if (!token) {
    return NextResponse.json(
      { message: "invalid or expired session" },
      { status: 401 }
    );
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
