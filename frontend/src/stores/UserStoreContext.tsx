import React from "react";
import { userStore } from "./UserStore";

export const UserStoreContext = React.createContext(userStore);

export const UserStoreProvider: React.FC<{ children: React.ReactNode }> = (
  { children },
) => (
  <UserStoreContext.Provider value={userStore}>
    {children}
  </UserStoreContext.Provider>
);
