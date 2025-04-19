import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import bookingsReducer from "./bookingsSlice";
import roomsReducer from "./roomsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bookings: bookingsReducer,
    rooms: roomsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
