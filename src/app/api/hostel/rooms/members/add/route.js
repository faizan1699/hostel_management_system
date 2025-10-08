import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "../../../../../../backend/config/db/db";
import { Room } from "../../../../../../backend/schema/roomsScheemas";

export const POST = async (req) => {
  connectDB();

  try {
    const reqBody = await req.json();
    const { room_id, member_ids } = reqBody;

    if (!room_id || !Array.isArray(member_ids) || member_ids.length === 0) {
      return NextResponse.json(
        { message: "room_id and member_ids[] are required" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(room_id)) {
      return NextResponse.json({ message: "Invalid room_id" }, { status: 400 });
    }

    const validMemberIds = member_ids.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    console.log(validMemberIds, member_ids);

    if (validMemberIds.length === 0) {
      return NextResponse.json(
        { message: "No valid member IDs provided" },
        { status: 400 }
      );
    }

    const room = await Room.findById(room_id);
    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    const newMembers = validMemberIds.filter(
      (id) => !room.members.some((m) => m.toString() === id)
    );

    if (newMembers.length === 0) {
      return NextResponse.json(
        { message: "All provided members already exist in this room" },
        { status: 400 }
      );
    }

    const availableSlots = room.capacity - room.members.length;
    if (newMembers.length > availableSlots) {
      return NextResponse.json(
        {
          message: `Room only has ${availableSlots} slot(s) left`,
        },
        { status: 400 }
      );
    }

    const newMemberObjects = newMembers.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    room.members.push(...newMemberObjects);
    await room.save();

    const updatedRoom = await Room.findById(room_id).populate(
      "members",
      "name email"
    );

    return NextResponse.json(
      {
        message: `${newMembers.length} member(s) added successfully`,
        room: updatedRoom,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding members:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
