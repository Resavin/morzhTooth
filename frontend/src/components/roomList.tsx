import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // 1. Import Link
import { getRooms } from "@/api/general";
import { Room } from "@/types/types";

export const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching rooms");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg text-white">Loading rooms...</div>
    ); // Added text-white
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto p-4 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1 ">
        {rooms.map((room) => (
          // 2. Wrap the div content with Link
          <Link
            key={room._id} // 3. Move key to the Link component
            to={`/rooms/${room._id}`} // 4. Define the destination URL (adjust path as needed)
            className="block bg-sky-700  rounded-sm w-[18rem] mr-20 p-4 border-1 shadow-sky-900 shadow-2xl border-sky-800 hover:bg-sky-600 hover:border-sky-700 transition-shadow"
            // 5. Apply styling classes to the Link component
            // Added 'block' to ensure it behaves like the div container
          >
            {/* The content of the card remains inside the Link */}
            <h3 className="text-xl font-bold">{room.name}</h3>
            <p className="">{room.description}</p>
            <p className="text-lg font-semibold mt-2">Цена: ${room.price}</p>
            <div className="mt-4 flex space-x-4">
              {room.images.length > 0 && (
                <img
                  src={room.images[0]}
                  alt={`Комната ${room.name}`}
                  className="w-64 h-48 object-cover rounded-lg mix-blend-hard-light"
                />
              )}
            </div>
          </Link> // 6. Close the Link component
        ))}
      </div>
    </div>
  );
};
