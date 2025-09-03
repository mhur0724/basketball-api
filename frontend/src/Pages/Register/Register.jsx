import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const API = import.meta.env.VITE_API_URL;
      console.log("API URL:", import.meta.env.VITE_API_URL)
      const res = await axios.post(`${API}/register`, {
        username,
        password,
      });
      setMessage(`✅ Registered: ${res.data.username || username}`);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Error registering user:", err);
      setMessage("❌ Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] w-full grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-6">
          <h1 className="text-xl font-semibold mb-4">Register</h1>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Enter a username"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-sm text-center">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
