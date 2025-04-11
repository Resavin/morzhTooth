import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Don't remove!
import { IBooking } from "@/types/types";
interface BookingFormProps {
  roomId: string;
}

interface DateRange {
  start: Date;
  end: Date;
}

export const BookingForm: React.FC<BookingFormProps> = ({ roomId }) => {
  // Date range state (using a tuple)
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  // State to store already booked date intervals for the room
  const [bookedRanges, setBookedRanges] = useState<DateRange[]>([]);

  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Fetch already booked dates for the room
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/general/bookings");
        if (response.ok) {
          const data = await response.json();
          // Filter to get only the bookings for the current room
          const roomBookings = data.filter(
            (booking: any) => booking.roomId === roomId,
          );
          const ranges: DateRange[] = roomBookings.map((booking: any) => ({
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
          }));
          setBookedRanges(ranges);
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchBookings();
  }, [roomId]);

  // Optional: Fetch on date picker focus (if desired)
  const handleDatePickerFocus = () => {
    // Re-fetch bookings for up-to-date information (if needed)
    // fetchBookings(); // uncomment if you wish to re-fetch on focus
  };

  // Helper to check overlap between two date ranges
  const rangesOverlap = (range1: DateRange, range2: DateRange): boolean => {
    return range1.start <= range2.end && range2.start <= range1.end;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    // Check that the selected range is not in the past:
    const now = new Date();
    if (startDate < now || endDate < now) {
      setError("You can only book dates after the current date.");
      return;
    }

    // Validate that selected range does not overlap any booked range
    for (let booked of bookedRanges) {
      if (rangesOverlap({ start: startDate, end: endDate }, booked)) {
        setError(
          "нельзя выбрать, пересекается с уже забронированными датами",
        );
        return;
      }
    }

    const bookingData: IBooking = {
      roomId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    // Check if the user is logged in by verifying a token (this is a simple example)
    const token = localStorage.getItem("jwt");
    const isLoggedIn = Boolean(token);
    try {
      const response = await fetch("http://localhost:3000/general/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create booking");
      } else {
        setSuccessMessage("Booking created successfully!");
        // Update bookedRanges state so the new booking shows immediately
        setBookedRanges((prev) => [
          ...prev,
          { start: startDate, end: endDate },
        ]);
        // Clear the selected dates
        setDateRange([null, null]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <form
      onSubmit={handleBooking}
      className="flex flex-col gap-4 p-4 bg-gray-700 rounded-lg shadow-lg"
    >
      <div className="flex flex-col">
        <label className="text-white mb-1">Выберите даты</label>
        <DatePicker
          selectsRange
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={(update: [Date | null, Date | null]) =>
            setDateRange(update)}
          onFocus={handleDatePickerFocus}
          dateFormat="dd/MM/yyyy"
          placeholderText="даты"
          // Exclude dates that are already booked
          excludeDateIntervals={bookedRanges}
          highlightDates={bookedRanges}
          // minDate prevents selecting any date before today
          minDate={new Date()}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Забронировать
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {successMessage && (
        <div className="text-green-500 text-sm">{successMessage}</div>
      )}
    </form>
  );
};
