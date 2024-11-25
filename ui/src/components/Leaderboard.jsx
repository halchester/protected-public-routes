"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await api.get("/leaderboard");
      setLeaderboard(data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <ul className="mt-4 space-y-2">
        {leaderboard.map((user, index) => (
          <li key={user._id} className="flex justify-between">
            <span>
              {index + 1}. {user.username}
            </span>
            <span>{user.completedTodos} todos</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
