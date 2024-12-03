"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
}

interface LoginProps {
  onLogin: () => void; // Callback function to notify parent component on login success
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = { username, password };

    try {
      const response = await axios.post<LoginResponse>("/api/v1/login/", formData);

      // Save tokens and user info in sessionStorage
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      sessionStorage.setItem("username", response.data.username);

      // Notify parent component about successful login
      onLogin();
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          {error && <div className="mb-4 text-red-600 text-sm sm:text-base">{error}</div>}

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 sm:p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
