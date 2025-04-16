import React, { useEffect, useState } from "react";
import { IBooking } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";

interface Booking extends IBooking {
  _id: string;
}
interface JwtPayload {
  id: string;
}

export const BookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roomInfo, setRoomInfo] = useState<
    Record<string, { name: string; images: string[]; price: number }>
  >({});

  const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem("jwt");
    if (!token) return null;
    try {
      const parsedPayload = jwtDecode(token) as JwtPayload;
      return parsedPayload.id;
    } catch (err) {
      console.error("Failed to decode JWT:", err);
      return null;
    }
  };

  const fetchBookings = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/general/bookings/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRoomInfo = async () => {
      const uniqueRoomIds = Array.from(new Set(bookings.map((b) => b.roomId)));
      const info: Record<
        string,
        { name: string; images: string[]; price: number }
      > = {};
      await Promise.all(
        uniqueRoomIds.map(async (roomId) => {
          try {
            const response = await fetch(
              `http://localhost:3000/general/rooms/${roomId}`,
            );
            if (response.ok) {
              const room = await response.json();
              info[roomId] = {
                name: room.name,
                images: room.images || [],
                price: room.price || 0,
              };
            } else {
              info[roomId] = { name: "Unknown Room", images: [], price: 0 };
            }
          } catch {
            info[roomId] = { name: "Unknown Room", images: [], price: 0 };
          }
        }),
      );
      setRoomInfo(info);
    };
    if (bookings.length > 0) {
      fetchRoomInfo();
    }
  }, [bookings]);

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      fetchBookings(userId);
    } else {
      setError("User not authenticated");
      setLoading(false);
    }
  }, []);

  function getNights(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  if (loading) {
    return <div className="text-center text-lg">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="text-white w-128 p-4">
      <h1 className="text-2xl font-bold mb-4">ваши бронирования</h1>
      {bookings.length === 0
        ? <p>бронирования не найдены</p>
        : (
          <ul className="space-y-4">
            {bookings.map((booking) => {
              const info = roomInfo[booking.roomId];
              const firstImage = info?.images?.[0];
              const nights = getNights(booking.startDate, booking.endDate);
              const totalPrice = info?.price ? info.price * nights : 0;
              return (
                <Link to={`/rooms/${booking.roomId}`} key={booking._id}>
                  <li className="p-4 border rounded-lg shadow-sm flex items-center gap-4">
                    {firstImage && (
                      <img
                        src={firstImage}
                        alt={info?.name || "Room"}
                        className="w-24 h-16 text-center object-cover rounded"
                      />
                    )}
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {info?.name || "Loading..."}
                        </h2>
                        <p className="text-white">
                          {new Date(booking.startDate).toLocaleDateString()} -
                          {" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {nights} ночей ×{" "}
                          {info?.price ? `$${info.price}` : "?"}
                        </p>
                      </div>
                      <p className="text-lg font-bold">
                        {totalPrice ? `$${totalPrice}` : ""}
                      </p>
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
