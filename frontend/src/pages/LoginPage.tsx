import React, { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "@/store/authApi";
import { useNavigate } from "react-router";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!username || !password) {
      setError("поля не заполнены");
      return;
    }
    try {
      const data = await login({ username, password }).unwrap();
      if (!data.token) throw new Error("вроде зашёл, но токена нет");
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("username", username);
      navigate("/");
    } catch (err: any) {
      setError(err?.data?.message || err.message || "ошибка входа");
    }
  };

  const handleRegister = async () => {
    setError("");
    if (!username || !password) {
      setError("поля не заполнены");
      return;
    }
    try {
      await register({ username, password }).unwrap();
      await handleLogin();
    } catch (err: any) {
      setError(err?.data?.message || err.message || "ошибка регистрации");
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
        disabled={isLoggingIn}
      >
        вход
      </button>
      <button
        type="button"
        onClick={handleRegister}
        className="hover-hatch bg-transparent hover:bg-blue-500 p-2 border rounded-md"
        disabled={isRegistering}
      >
        рег
      </button>
      {error && (
        <div className="h-6 border border-amber-50 text-center my-1">
          <p className="bg-rose-700 text-sm h-5">{error}</p>
        </div>
      )}
    </div>
  );
};
