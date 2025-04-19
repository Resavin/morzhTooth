import React, { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "@/store/roomsSlice";
import { AppDispatch, RootState } from "@/store";

export const RoomList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading, error } = useSelector((state: RootState) =>
    state.rooms
  );

  useEffect(() => {
    if (rooms.length === 0 && !loading) {
      dispatch(fetchRooms());
    }
  }, [dispatch, rooms.length, loading]);

  if (loading) {
    return (
      <div className="text-center text-lg text-white">Loading rooms...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto p-4 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1 ">
        {rooms.map((room) => (
          <Link
            key={room._id}
            to={`/rooms/${room._id}`}
            className="block bg-sky-700 rounded-sm w-[18rem] mr-20 p-4 border-1 shadow-sky-900 shadow-2xl border-sky-800 hover:bg-sky-600 hover:border-sky-700 transition-shadow"
          >
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
          </Link>
        ))}
      </div>
    </div>
  );
};
