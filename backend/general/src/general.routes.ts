import { Router } from "express";
import { createRoom, getAllRooms } from "./general.service";

const router = Router();

/**
 * @openapi
 * /general/rooms:
 *   get:
 *     summary: Get all hotel rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of hotel rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get("/rooms", async (_, res) => {
  const rooms = await getAllRooms();
  res.json(rooms);
});

/**
 * @openapi
 * /general/rooms:
 *   post:
 *     summary: Create a hotel room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post("/rooms", async (req, res) => {
  const newRoom = await createRoom(req.body);
  try {
    res.status(201).json(newRoom);
    console.log("AAAAAAAAAAAAAAAAAa");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
