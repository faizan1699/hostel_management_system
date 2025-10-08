import { NextResponse } from "next/server";
import { Room } from "../../../../../backend/schema/roomsScheemas.js";
import connectDB from "../../../../../backend/config/db/db.js";

export const GET = async () => {
  connectDB();
  try {
    const data = await Room.find();
    return NextResponse.json(
      {
        message: "",
        rooms: data,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};
