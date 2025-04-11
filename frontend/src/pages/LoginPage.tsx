import React, { useState } from "react";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  // --- LOGIN HANDLER ---
  const handleLogin = async () => {
    setError(""); // Clear previous messages
    setSuccessMessage("");

    if (!username || !password) {
      setError("поля не заполнены");
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

      localStorage.setItem("jwt", data.token);
      localStorage.setItem("username", username);
      window.location.href = "/"; // Or use useNavigate for SPA routing
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("непонятная ошибка произошла");
        console.error("Caught non-Error object during login:", error);
      }
    }
  };

  // --- REGISTRATION HANDLER ---
  const handleRegister = async () => {
    setError(""); // Clear previous messages
    setSuccessMessage("");

    if (!username || !password) {
      setError("поля не заполнены");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/register", { // Correct endpoint
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

      handleLogin();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected registration error occurred.");
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
      >
        вход
      </button>
      <button
        type="button"
        onClick={handleRegister}
        className="hover-hatch bg-transparent hover:bg-blue-500 p-2 border rounded-md"
      >
        рег
      </button>

      {/* --- DEDICATED MESSAGE AREA --- */}
      {error &&
        (
          <div className="h-6 border border-amber-50 text-center my-1">
            {/* Display error messages */}
            {error && <p className="bg-rose-700 text-sm h-5">{error}</p>}
          </div>
        )}
      {/* --- END MESSAGE AREA --- */}
    </div>
  );
};
