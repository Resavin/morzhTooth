export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Room {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}
export interface IBooking {
  roomId: string;
  userId: string;
  startDate: string; // Or Date, depending on your needs. For API transfers, ISO strings are common.
  endDate: string;
}
