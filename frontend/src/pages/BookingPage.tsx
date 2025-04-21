import React from "react";
import { useGetBookingsByUserQuery, useGetRoomByIdQuery } from "@/store/api";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";

interface JwtPayload {
  id: string;
}

function getUserIdFromToken(): string | null {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  try {
    const parsedPayload = jwtDecode(token) as JwtPayload;
    return parsedPayload.id;
  } catch (err) {
    console.error("Failed to decode JWT:", err);
    return null;
  }
}

function getNights(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

export const BookingPage: React.FC = () => {
  const userId = getUserIdFromToken();
  const {
    data: bookings,
    isLoading,
    error,
  } = useGetBookingsByUserQuery(userId!, { skip: !userId });

  // Helper to fetch room info for each booking
  const RoomInfo = ({ roomId }: { roomId: string }) => {
    const { data: room, isLoading } = useGetRoomByIdQuery(roomId);
    if (isLoading) return <span>Loading...</span>;
    if (!room) return <span>Unknown Room</span>;
    return (
      <>
        <h2 className="text-xl font-semibold">{room.name}</h2>
        {room.images.length > 0 && (
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-24 h-16 text-center object-cover rounded"
          />
        )}
      </>
    );
  };

  if (isLoading) {
    return <div className="text-center text-lg">Loading bookings...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Ошибка загрузки бронирований
      </div>
    );
  }

  return (
    <div className="text-white w-128 p-4">
      <h1 className="text-2xl font-bold mb-4">ваши бронирования</h1>
      {!bookings || bookings.length === 0
        ? <p>бронирования не найдены</p>
        : (
          <ul className="space-y-4">
            {bookings.map((booking) => {
              const nights = getNights(booking.startDate, booking.endDate);
              return (
                <Link to={`/rooms/${booking.roomId}`} key={booking._id}>
                  <li className="p-4 border rounded-lg shadow-sm flex items-center gap-4">
                    <RoomInfo roomId={booking.roomId} />
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <p className="text-white">
                          {new Date(booking.startDate).toLocaleDateString()} -
                          {" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                        {/* Room price and total price */}
                        <RoomPrice roomId={booking.roomId} nights={nights} />
                      </div>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
    </div>
  );
};

// Helper component to show price
const RoomPrice: React.FC<{ roomId: string; nights: number }> = ({
  roomId,
  nights,
}) => {
  const { data: room } = useGetRoomByIdQuery(roomId);
  if (!room) return null;
  const totalPrice = room.price * nights;
  return (
    <p className="text-gray-400 text-sm">
      {nights} ночей × ${room.price} ={" "}
      <span className="text-lg font-bold">${totalPrice}</span>
    </p>
  );
};
