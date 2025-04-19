import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  username?: string;
}

interface UserState {
  userId: string | null;
  username: string | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  userId: null,
  username: null,
  token: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ token: string; username: string }>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem("jwt", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      try {
        const decoded = jwtDecode(action.payload.token) as JwtPayload;
        state.userId = decoded.id;
      } catch {
        state.userId = null;
      }
    },
    logout(state) {
      state.userId = null;
      state.username = null;
      state.token = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("username");
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    loadFromStorage(state) {
      const token = localStorage.getItem("jwt");
      const username = localStorage.getItem("username");
      if (token) {
        state.token = token;
        try {
          const decoded = jwtDecode(token) as JwtPayload;
          state.userId = decoded.id;
        } catch {
          state.userId = null;
        }
      }
      if (username) {
        state.username = username;
      }
    },
  },
});

export const { setUser, logout, setError, setLoading, loadFromStorage } =
  userSlice.actions;
export default userSlice.reducer;
