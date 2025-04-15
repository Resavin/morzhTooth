// src/middleware/auth.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized: No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  const secret = process.env.JWT_SECRET || "defaultsecret"; // use environment variable
  const decoded = jwt.verify(token, secret) as JwtPayload;
  try {
    const secret = process.env.JWT_SECRET || "defaultsecret"; // use environment variable
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Optional: You can attach user info to req object so subsequent handlers can use it.
    (req as any).user = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};
