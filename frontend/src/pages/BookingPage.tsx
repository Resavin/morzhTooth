import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BookingStoreContext } from "@/stores/BookingStoreContext";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";
import { Booking } from "@/types/types";

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

export const BookingPage: React.FC = observer(() => {
  const bookingStore = React.useContext(BookingStoreContext);

  useEffect(() => {
    const userId = getUserIdFromToken();
    const token = localStorage.getItem("jwt");
    if (userId && token) {
      bookingStore.fetchBookings(userId, token);
    } else {
      bookingStore.error = "вы не авторизованы";
      bookingStore.loading = false;
    }
    // eslint-disable-next-line
  }, []);

  if (bookingStore.loading) {
    return <div className="text-center text-lg">Loading bookings...</div>;
  }

  if (bookingStore.error) {
    return <div className="text-center text-red-500">{bookingStore.error}</div>;
  }

  return (
    <div className="text-white w-128 p-4">
      <h1 className="text-2xl font-bold mb-4">ваши бронирования</h1>
      {bookingStore.bookings.length === 0
        ? <p>бронирования не найдены</p>
        : (
          <ul className="space-y-4">
            {bookingStore.bookings.map((booking) => {
              const info = bookingStore.roomInfo[booking.roomId];
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
                          {info?.name || "загрузка..."}
                        </h2>
                        <p className="text-white">
                          {new Date(booking.startDate).toLocaleDateString()} -
                          {" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {nights} ночей × {info?.price ? `$${info.price}` : "?"}
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
});
