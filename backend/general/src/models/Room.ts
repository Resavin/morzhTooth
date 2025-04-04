import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  name: string;
  description: string;
  price: number;
  images: string[]; // Array of image URLs
}

const RoomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String],
});

export const Room = mongoose.model<IRoom>("Room", RoomSchema);
