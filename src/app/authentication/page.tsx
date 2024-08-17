"use client";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import React, { useState } from "react";

export default function Page() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={toggleForm}
        className="mb-4 font-semibold"
      >
        {isLogin ? "Need an account? Register" : "Have an account? Login"}
      </button>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
}
