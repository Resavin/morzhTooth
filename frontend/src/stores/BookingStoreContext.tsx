import React from "react";
import { bookingStore } from "./BookingStore";

export const BookingStoreContext = React.createContext(bookingStore);

export const BookingStoreProvider: React.FC<{ children: React.ReactNode }> = (
  { children },
) => (
  <BookingStoreContext.Provider value={bookingStore}>
    {children}
  </BookingStoreContext.Provider>
);
