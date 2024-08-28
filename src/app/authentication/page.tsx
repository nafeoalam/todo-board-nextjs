"use client";
import { AuthContext } from "@/components/Auth/AuthContext";
import Register from "@/components/Auth/Register";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";

const Login = dynamic(() => import("@/components/Auth/Login"), {
  ssr: false,
});

export default function Page() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const auth = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    // Function to get a specific cookie by name
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    // Get the value of the cookie named 'cookie-name'
    const value = getCookie("token");

    if (!value) auth?.logout();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button onClick={toggleForm} className="mb-4 font-semibold">
        {isLogin ? "Need an account? Register" : "Have an account? Login"}
      </button>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
}
