import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	// Add more fields as needed (e.g., password, role, etc.)
}

const UserSchema: Schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true }
});

export const User = mongoose.model<IUser>("User", UserSchema);
