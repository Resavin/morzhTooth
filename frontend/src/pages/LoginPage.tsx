import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFromStorage,
  setError,
  setLoading,
  setUser,
} from "@/store/userSlice";
import { RootState } from "@/store";
import { useNavigate } from "react-router";

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  const handleLogin = async () => {
    dispatch(setError(""));
    dispatch(setLoading(true));

    if (!username || !password) {
      dispatch(setError("поля не заполнены"));
      dispatch(setLoading(false));
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        let errorMessage = `Login failed: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          console.error("ошибка парсинга логин респонса", jsonError);
        }
        throw new Error(errorMessage);
      }

      interface LoginResponse {
        token: string;
      }
      const data = (await response.json()) as LoginResponse;

      if (!data.token) {
        throw new Error("вроде зашёл, но токена нет");
      }

      dispatch(setUser({ token: data.token, username }));
      dispatch(setLoading(false));
      navigate("/");
    } catch (error) {
      dispatch(setLoading(false));
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("непонятная ошибка произошла"));
        console.error("Caught non-Error object during login:", error);
      }
    }
  };

  const handleRegister = async () => {
    dispatch(setError(""));
    dispatch(setLoading(true));

    if (!username || !password) {
      dispatch(setError("поля не заполнены"));
      dispatch(setLoading(false));
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        let errorMessage = `Registration failed: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          console.error(
            "Failed to parse registration error response:",
            jsonError,
          );
        }
        throw new Error(errorMessage);
      }

      await handleLogin();
    } catch (error) {
      dispatch(setLoading(false));
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unexpected registration error occurred."));
        console.error("Caught non-Error object during registration:", error);
      }
    }
  };

  return (
    <div className="text-white w-96 h-[30rem] flex flex-col gap-4 p-4 rounded max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-center">ВХОД/РЕГ</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="юзернейм"
        required
        className="p-2 border rounded text-white"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="пароль"
        required
        className="p-2 border rounded text-white"
      />

      <button
        type="button"
        onClick={handleLogin}
        className="hover-hatch bg-transparent hover:bg-emerald-500 mt-3 p-2 border "
        disabled={user.loading}
      >
        вход
      </button>
      <button
        type="button"
        onClick={handleRegister}
        className="hover-hatch bg-transparent hover:bg-blue-500 p-2 border rounded-md"
        disabled={user.loading}
      >
        рег
      </button>

      {user.error &&
        (
          <div className="h-6 border border-amber-50 text-center my-1">
            <p className="bg-rose-700 text-sm h-5">{user.error}</p>
          </div>
        )}
    </div>
  );
};
