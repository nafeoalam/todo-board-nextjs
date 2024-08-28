"use client";
import Register from "@/components/Auth/Register";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Login = dynamic(() => import("@/components/Auth/Login"), {
  ssr: false,
});

export default function Page() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button onClick={toggleForm} className="mb-4 font-semibold">
        {isLogin ? "Need an account? Register" : "Have an account? Login"}
      </button>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
}
