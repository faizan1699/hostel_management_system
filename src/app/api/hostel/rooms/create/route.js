import { NextResponse } from "next/server";
import { Room } from "../../../../../backend/schema/roomsScheemas.js";
import connectDB from "../../../../../backend/config/db/db.js";

export const POST = async (req) => {
  connectDB();
  try {
    const reqBody = await req.json();
    const { room_name, capacity } = reqBody;
    console.log(room_name, capacity);
    if (!room_name || !capacity) {
      return NextResponse.json(
        { message: "room name and number is required" },
        { status: 400 }
      );
    }
    const existingRoom = await Room.findOne({ room_name });
    if (existingRoom) {
      return NextResponse.json(
        { message: "Room name already exists" },
        { status: 400 }
      );
    }

    const newRoom = await Room.create({
      room_name,
      capacity,
    });

    return NextResponse.json(
      {
        message: "Room created successfully",
        room: newRoom,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
};
