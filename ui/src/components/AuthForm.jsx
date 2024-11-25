"use client";

import React, { useState } from "react";
import api from "../lib/api";
import { saveToken } from "../lib/auth";

export default function AuthForm({ onAuth }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isSignIn ? "/auth/signin" : "/auth/signup";
    try {
      const { data } = await api.post(endpoint, formData);
      if (isSignIn) {
        saveToken(data.token);
        onAuth();
      } else {
        setIsSignIn(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {isSignIn ? "Sign In" : "Create Account"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={() => setIsSignIn(!isSignIn)}
        className="mt-4 text-sm text-blue-500"
      >
        {isSignIn ? "Create an account" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
