import mongoose from "mongoose";
const roomSchema = new mongoose.Schema(
  {
    room_name: {
      type: String,
      required: [true, "Room name is required"],
      unique: true,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Room =
  mongoose.models.Rooms || mongoose.model("Rooms", roomSchema);
