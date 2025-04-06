import React, { useEffect, useState } from "react";
import { getRooms } from "@/api/general"; // Import the getRooms function
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
    return <div className="text-center text-lg">Loading rooms...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto p-4 text-white">
      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-sky-700 shadow-md rounded-sm w-[18rem] mr-20 p-4 border-1 border-sky-800 hover:bg-sky-600 hover:border-sky-700 transition-shadow"
          >
            <h3 className="text-xl font-bold">{room.name}</h3>
            <p className="">{room.description}</p>
            <p className="text-lg font-semibold mt-2">Цена: ${room.price}</p>
            <div className="mt-4 flex space-x-4">
              {room.images.length > 0 && (
                <img
                  src={room.images[0]} // Accessing the first image
                  alt={`Комната ${room.name}`}
                  className="w-64 h-48 object-cover rounded-lg mix-blend-hard-light"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
