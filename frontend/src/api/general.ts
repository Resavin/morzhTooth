import { Room } from "@/types/types";

const API_URL = "http://localhost:3000"; // Change this to your backend URL

// Function to get all rooms
export const getRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch(`${API_URL}/general/rooms`);
    if (!response.ok) {
      throw new Error("Error fetching rooms");
    }
    return await response.json(); // TypeScript will now know that the response is of type Room[]
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

// Function to create a new room
export const createRoom = async (roomData: Room): Promise<Room> => { // Type `roomData` as `Room`
  try {
    const response = await fetch(`${API_URL}/general/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });
    if (!response.ok) {
      throw new Error("Error creating room");
    }
    return await response.json(); // The response will be typed as a `Room` object
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};
