import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "@/types/types";

interface RoomInfo {
  name: string;
  images: string[];
  price: number;
}

interface BookingsState {
  bookings: Booking[];
  roomInfo: Record<string, RoomInfo>;
  loading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  roomInfo: {},
  loading: false,
  error: null,
};

// Thunk to fetch bookings for a user
export const fetchBookings = createAsyncThunk<
  Booking[],
  { userId: string; token: string }
>("bookings/fetchBookings", async ({ userId, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `http://localhost:3000/general/bookings/user/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (!response.ok) throw new Error("Failed to fetch bookings");
    return await response.json();
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch bookings");
  }
});

// Thunk to fetch room info for a set of roomIds
export const fetchRoomInfo = createAsyncThunk<
  Record<string, RoomInfo>,
  string[]
>("bookings/fetchRoomInfo", async (roomIds, { rejectWithValue }) => {
  const info: Record<string, RoomInfo> = {};
  await Promise.all(
    roomIds.map(async (roomId) => {
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
  return info;
});

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearBookings(state) {
      state.bookings = [];
      state.roomInfo = {};
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRoomInfo.fulfilled, (state, action) => {
        state.roomInfo = action.payload;
      });
  },
});

export const { clearBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
