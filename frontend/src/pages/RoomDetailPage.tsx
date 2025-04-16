import React, { useEffect, useState } from "react";
import { useParams } from "react-router"; // Hook to get URL parameters
import { Room } from "@/types/types"; // Assuming your Room type is here
import { BookingForm } from "@/components/bookingForm";

export const RoomDetailPage: React.FC = () => {
  // Get the roomId from the URL parameter defined in the Route
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Function to fetch room details from the API ---
  const fetchRoomData = async (roomId: string) => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      // Adjust the URL to match your backend route. IMPORTANT: REMEMBER THE BASE URL
      const response = await fetch(
        `http://localhost:3000/general/rooms/${roomId}`,
      );

      if (!response.ok) {
        let errorMessage =
          `Failed to fetch room details: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          console.error("Failed to parse error response:", jsonError);
          errorMessage =
            `Failed to fetch room. Status: ${response.status}. Could not parse error.`;
        }
        throw new Error(errorMessage); // Reject the promise
      }

      const data = (await response.json()) as Room; // Explicitly type data
      setRoom(data);
    } catch (error) {
      // Type-safe error handling in the catch block
      if (error instanceof Error) {
        console.error("Fetch Error:", error.message);
        setError(error.message);
      } else {
        console.error("An unexpected error occurred:", error);
        setError("An unexpected error occurred while fetching room details.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- useEffect Hook ---
  useEffect(() => {
    if (roomId) {
      // Only call fetchRoomData if roomId is not null or undefined
      fetchRoomData(roomId);
    } else {
      setError("Room ID is missing in the URL.");
      setLoading(false);
    }
  }, [roomId]); // Effect runs when roomId changes

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="text-center text-lg text-white p-10">
        Loading room details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">{error}</div>;
  }

  if (!room) {
    return (
      <div className="text-center text-lg text-white p-10">Room not found.</div>
    );
  }

  // --- Display Room Details ---
  return (
    <div className="max-h-screen p-6 text-white bg-gray-800 opacity-70 mr-96 ml-48 rounded-lg shadow-xl my-8">
      <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
      <p className="text-lg text-gray-300 mb-6">{room.description}</p>
      <p className="text-xl font-semibold mb-6">Цена: ${room.price}</p>

      {/* Display Images (Example: Simple Gallery) */}
      <div className="mb-3">
        <h2 className="text-xl max-w-xl font-semibold mb-4">Фотографии</h2>
        {room.images && room.images.length > 0
          ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {room.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${room.name} - Image ${index + 1}`}
                  className=" h-64 object-cover rounded-md shadow-md"
                />
              ))}
            </div>
          )
          : <p className="text-gray-400">Нет доступных изображений.</p>}
        <BookingForm roomId={roomId!} />
      </div>
    </div>
  );
};
