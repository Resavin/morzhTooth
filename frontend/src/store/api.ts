import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Booking } from "@/types/types";

export interface Room {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/general",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("jwt");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRooms: builder.query<Room[], void>({ query: () => "/rooms" }),
    getRoomById: builder.query<Room, string>({
      query: (roomId) => `/rooms/${roomId}`,
    }),
    getBookingsByUser: builder.query<Booking[], string>({
      query: (userId) => `/bookings/user/${userId}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: "Booking" as const, id: _id })),
            { type: "Booking", id: "LIST" },
          ]
          : [{ type: "Booking", id: "LIST" }],
    }),
    createBooking: builder.mutation<Booking, Partial<Booking>>({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }],
    }),
  }),
  tagTypes: ["Booking"],
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useGetBookingsByUserQuery,
  useCreateBookingMutation,
} = api;
