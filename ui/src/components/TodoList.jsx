"use client";

import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/auth";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await api.get("/todos");
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/todos", { text: newTodo });
    setTodos((prev) => [...prev, data]);
    setNewTodo("");
  };

  const handleCompleteTodo = async (id) => {
    const { data } = await api.patch(`/todos/${id}/complete`);
    setTodos((prev) => prev.map((todo) => (todo._id === id ? data : todo)));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4">Your Todos</h2>
        <div>
          <button
            className="text-sm text-red-500"
            onClick={() => {
              removeToken();
              router.push("/");
            }}
          >
            Signout
          </button>
        </div>
      </div>
      <form onSubmit={handleAddTodo} className="space-y-4">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Add Todo
        </button>
      </form>
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <li key={todo._id} className="flex items-center justify-between">
            <span className={todo.completed ? "line-through" : ""}>
              {todo.text}
            </span>
            {!todo.completed && (
              <button
                onClick={() => handleCompleteTodo(todo._id)}
                className="text-sm text-blue-500"
              >
                Mark as Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
