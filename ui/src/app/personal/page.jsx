"use client";

import AuthForm from "@/components/AuthForm";
import TodoList from "@/components/TodoList";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function PersonalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if JWT token exists
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="p-4">
      {isLoggedIn ? (
        <TodoList />
      ) : (
        <AuthForm
          onAuth={() => {
            setIsLoggedIn(true);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
