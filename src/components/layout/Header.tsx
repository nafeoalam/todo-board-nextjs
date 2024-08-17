"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/components/Auth/AuthContext";
import { useRouter } from "next/navigation";

function Header() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    try {
      auth?.logout();

      router.push("/authentication");
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg">TODO Web App</h1>
      {auth?.isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </header>
  );
}

export default Header;
