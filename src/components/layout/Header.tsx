"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/components/Auth/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      {auth?.isLoggedIn && (
        <div>
          <div className="flex-grow flex items-center justify-center space-x-6">
            <Link href="/dashboard">
              <span className="text-white hover:text-blue-300 px-3 py-2 rounded transition duration-300 ease-in-out">
                Dashboard
              </span>
            </Link>
            <Link href="/category">
              <span className="text-white hover:text-blue-300 px-3 py-2 rounded transition duration-300 ease-in-out">
                Categories
              </span>
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
