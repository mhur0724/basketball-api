import React, { useState } from "react";

/**
 * Simple LoginForm
 *
 * Props:
 * - onSubmit: ({ username, password }) => void
 * - registerHref?: string (URL to navigate to register page)
 */
export default function LoginForm({ onSubmit, registerHref = "/register" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit({ username, password });
    }
  }

  return (
    <div className="min-h-[60vh] w-full grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-6">
          <h1 className="text-xl font-semibold mb-4">Login</h1>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
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

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
              >
                Sign in
              </button>

              <a
                href={registerHref}
                className="flex-1 rounded border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 text-center hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
