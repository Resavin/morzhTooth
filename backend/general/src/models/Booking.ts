import mongoose, { Document } from "mongoose";
import { IBooking } from "../../../types/types";

export interface BookingDocument extends IBooking, Document {}

const bookingSchema = new mongoose.Schema<BookingDocument>({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // <-- Add this line
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export default mongoose.model<BookingDocument>("Booking", bookingSchema);
//
// src/bookings/booking.model.ts
// import mongoose, { Document } from "mongoose";
//
// export interface IBooking {
//   roomId: string;
//   startDate: Date;
//   endDate: Date;
// }
//
// export interface BookingDocument extends IBooking, Document { }
//
// const bookingSchema = new mongoose.Schema({
//   roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
// });
//
// export default mongoose.model<BookingDocument>("Booking", bookingSchema);
