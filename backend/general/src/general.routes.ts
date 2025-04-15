import { Request, Response, Router } from "express";
import {
  createBooking,
  createRoom,
  getAllBookings,
  getAllRooms,
  getBookingsByUserId,
  getRoomById,
} from "./general.service";
import { authMiddleware } from "./middleware";

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
    console.log("Room created successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @openapi
 * /general/rooms/{roomId}:
 *   get:
 *     summary: Get a single hotel room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to retrieve.
 *     responses:
 *       200:
 *         description: Details of the hotel room.
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
 *       404:
 *         description: Room not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Room not found
 *       500:
 *         description: Internal server error.
 */
router.get("/rooms/:roomId", async (req: Request, res: Response) => {
  try {
    const roomId = req.params.roomId;
    const room = await getRoomById(roomId);

    if (!room) {
      // If service returns null, room wasn't found
      return res.status(404).json({ message: "Room not found" });
    }

    // Room found, send it back
    res.json(room);
  } catch (err) {
    // Handle unexpected errors from the service or elsewhere
    console.error(`Error fetching room ${req.params.roomId}:`, err);
    res.status(500).json({ message: "Failed to retrieve room details" });
  }
});

/**
 * @openapi
 * /general/bookings:
 *   post:
 *     summary: Create a new booking for a room
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - startDate
 *               - endDate
 *             properties:
 *               roomId:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Booking created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 roomId:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
interface AuthRequest extends Request {
  user: string;
}
router.post(
  "/bookings",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    const { roomId, startDate, endDate } = req.body;
    if (!roomId || !startDate || !endDate) {
      return res.status(400).json({
        message: "Missing required booking fields.",
      });
    }
    try {
      const userId = req.user;
      console.log(userId);
      const booking = await createBooking({
        roomId,
        userId,
        startDate,
        endDate,
      });
      res.status(201).json(booking);
    } catch (err) {
      console.error("Error creating booking:", err);
      res.status(500).json({ message: "Failed to create booking." });
    }
  },
);

/**
 * @openapi
 * /general/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   roomId:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.get("/bookings", async (req: Request, res: Response) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Failed to retrieve bookings." });
  }
});

// GET /bookings/user/:userId
router.get(
  "/bookings/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      console.log("haja");
      const { userId } = req.params;
      const bookings = await getBookingsByUserId(userId);
      res.status(200).json(bookings);
    } catch (err) {
      console.error("Error fetching user bookings:", err);
      res.status(500).json({ message: "Failed to retrieve bookings." });
    }
  },
);

export default router;
