import { IRoom, Room } from "./models/Room";

export const getAllRooms = async (): Promise<IRoom[]> => {
  return Room.find();
};

export const createRoom = async (data: Partial<IRoom>): Promise<IRoom> => {
  const room = new Room(data);
  return room.save();
};
