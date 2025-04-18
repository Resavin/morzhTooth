import { makeAutoObservable, runInAction } from "mobx";
import { Booking, Room } from "@/types/types";

interface RoomInfo {
  name: string;
  images: string[];
  price: number;
}

export class BookingStore {
  bookings: Booking[] = [];
  roomInfo: Record<string, RoomInfo> = {};
  rooms: Room[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBookings(userId: string, token: string | null) {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch(
        `http://localhost:3000/general/bookings/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      runInAction(() => {
        this.bookings = data;
      });
      await this.fetchRoomInfo();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error
          ? err.message
          : "An unexpected error occurred";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchRoomInfo() {
    const uniqueRoomIds = Array.from(
      new Set(this.bookings.map((b) => b.roomId)),
    );
    const info: Record<string, RoomInfo> = {};
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
    runInAction(() => {
      this.roomInfo = info;
    });
  }
  async fetchRooms() {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch(`http://localhost:3000/general/rooms`);
      if (!response.ok) throw new Error("Error fetching rooms");
      const data: Room[] = await response.json();
      runInAction(() => {
        this.rooms = data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error
          ? error.message
          : "An unexpected error occurred";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const bookingStore = new BookingStore();
