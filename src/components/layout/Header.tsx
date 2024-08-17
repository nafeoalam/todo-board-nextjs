"use client"
import React, { useState } from 'react'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle login/logout state for demonstration
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1 className="text-lg">TODO Web App</h1>
    <button 
      onClick={toggleLogin} 
      className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
    >
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  </header>
  )
}

export default Header