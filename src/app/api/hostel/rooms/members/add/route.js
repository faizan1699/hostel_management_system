import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Room } from "../../../../../../backend/schema/roomsScheemas";
import connectDB from "../../../../../../backend/config/db/db";

export const POST = async (req) => {
  connectDB();
  try {
    const reqBody = await req.json();
    const { room_id, member_id } = reqBody;

    if (!room_id || !member_id) {
      return NextResponse.json(
        { message: "room_id and member_id are required" },
        { status: 400 }
      );
    }
    const room = await Room.findById(room_id);
    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    if (room.members.includes(member_id)) {
      return NextResponse.json(
        { message: "Member already in this room" },
        { status: 400 }
      );
    }

    if (room.members.length >= room.capacity) {
      return NextResponse.json({ message: "Room is full" }, { status: 400 });
    }

    room.members.push(new mongoose.Types.ObjectId(member_id));
    await room.save();

    const updatedRoom = await Room.findById(room_id).populate("members");

    return NextResponse.json(
      {
        message: "Member added successfully",
        room: updatedRoom,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding member:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
