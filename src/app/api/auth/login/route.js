import { NextResponse } from "next/server";
import connectDB from "../../../../config/backend/db/db";

export const POST = async () => {
  connectDB();
  try {
    return NextResponse.json({ message: "Api run" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
