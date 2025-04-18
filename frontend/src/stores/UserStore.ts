import { makeAutoObservable } from "mobx";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  username?: string;
}

export class UserStore {
  userId: string | null = null;
  username: string | null = null;
  token: string | null = null;
  error: string | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  loadFromStorage() {
    const token = localStorage.getItem("jwt");
    const username = localStorage.getItem("username");
    if (token) {
      this.token = token;
      try {
        const decoded = jwtDecode(token) as JwtPayload;
        this.userId = decoded.id;
      } catch {
        this.userId = null;
      }
    }
    if (username) {
      this.username = username;
    }
  }

  setUser(token: string, username: string) {
    this.token = token;
    this.username = username;
    localStorage.setItem("jwt", token);
    localStorage.setItem("username", username);
    try {
      const decoded = jwtDecode(token) as JwtPayload;
      this.userId = decoded.id;
    } catch {
      this.userId = null;
    }
  }

  logout() {
    this.userId = null;
    this.username = null;
    this.token = null;
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
  }

  setError(error: string) {
    this.error = error;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}

export const userStore = new UserStore();
