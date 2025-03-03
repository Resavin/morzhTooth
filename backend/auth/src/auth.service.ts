import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "./models/User";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export async function register(username: string, password: string) {
	const hashedPassword = await bcrypt.hash(password, 10);
	return User.create({ username, password: hashedPassword });
}

export async function login(username: string, password: string) {
	const user = await User.findOne({ username });
	if (!user) return null;
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return null;
	return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
}
