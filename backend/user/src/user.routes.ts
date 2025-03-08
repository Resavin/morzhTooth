import { Router } from "express";
import { getAllUsers, createUser } from "./user.service";

const router = Router();

// GET /users - Retrieve all users
router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// POST /users - Create a new user
router.post("/", async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

export default router;
