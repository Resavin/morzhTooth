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
