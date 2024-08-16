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
    <div>
      <button onClick={toggleForm}>
        {isLogin ? "Need an account? Register" : "Have an account? Login"}
      </button>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
}
