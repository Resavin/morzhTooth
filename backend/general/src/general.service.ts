import mongoose, { Document } from "mongoose"; // Import mongoose and Document
// Assuming './models/Room' exports:
// - IRoom: Your interface for room data
// - Room: Your Mongoose Model (e.g., mongoose.model<RoomDocument>('Room', roomSchema))
import { IRoom, Room } from "./models/Room";
import Booking, { BookingDocument } from "./models/Booking";
import { IBooking } from "../../../types/types";

export async function getBookingsByUserId(userId: string) {
  return Booking.find({ userId });
}
export const getAllBookings = async (): Promise<BookingDocument[]> => {
  // Room.find() returns documents, so the Promise resolves to RoomDocument[]
  return Booking.find();
  // If you specifically need plain JS objects instead of Mongoose documents, use .lean():
  // return Room.find().lean(); // Return type would then be Promise<IRoom[]>
};
export async function createBooking(data: IBooking): Promise<BookingDocument> {
  const booking = new Booking(data);
  return booking.save();
}
// 1. Define the Mongoose Document type
// It combines your data interface (IRoom) with Mongoose's Document methods/properties
export interface RoomDocument extends IRoom, Document {}

// 2. Correct return type for getAllRooms
export const getAllRooms = async (): Promise<RoomDocument[]> => {
  // Room.find() returns documents, so the Promise resolves to RoomDocument[]
  return Room.find();
  // If you specifically need plain JS objects instead of Mongoose documents, use .lean():
  // return Room.find().lean(); // Return type would then be Promise<IRoom[]>
};

// 3. Correct return type for createRoom
export const createRoom = async (
  data: Partial<IRoom>,
): Promise<RoomDocument> => {
  // 'new Room(data)' creates a Mongoose document instance
  const room = new Room(data);
  // room.save() returns a Promise resolving to the saved document
  return room.save();
};

// 4. Use the correct model name ('Room') and ensure return type is correct
export async function getRoomById(
  roomId: string,
): Promise<RoomDocument | null> { // Return type Promise<RoomDocument | null> is correct
  try {
    // Use the imported Mongoose model 'Room', not 'RoomModel'
    const room = await Room.findById(roomId);
    return room; // Returns the document or null if not found
  } catch (error) {
    // Handle potential errors like invalid ID format for Mongoose
    console.error(`Error finding room by ID ${roomId}:`, error);
    // Check specifically for CastError which indicates an invalid ID format for Mongoose
    if (error instanceof Error && error.name === "CastError") {
      // Invalid ID format likely
      return null;
    }
    // Re-throw other unexpected errors
    throw error;
  }
}
