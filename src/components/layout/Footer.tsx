import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}

export default Footer;
