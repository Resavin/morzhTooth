import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Room {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

interface RoomsState {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

const initialState: RoomsState = {
  rooms: [],
  loading: false,
  error: null,
};

export const fetchRooms = createAsyncThunk<Room[]>(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/general/rooms");
      if (!response.ok) throw new Error("Failed to fetch rooms");
      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch rooms");
    }
  },
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.rooms = action.payload;
        state.loading = false;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default roomsSlice.reducer;
