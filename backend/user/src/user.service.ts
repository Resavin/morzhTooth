import { User, IUser } from "./models/User";

// Retrieve all users from the database
export const getAllUsers = async (): Promise<IUser[]> => {
	return User.find({});
};

// Create a new user in the database
export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
	const user = new User(data);
	return user.save();
};
