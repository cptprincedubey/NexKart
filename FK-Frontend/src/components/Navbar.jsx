// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <div className="font-bold text-lg sm:text-2xl">NexKart</div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          {user && (
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link
                to="/products"
                className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm lg:text-base transition"
              >
                Products
              </Link>
              <span className="text-sm lg:text-base truncate">{user.fullname}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-2 rounded hover:bg-red-600 text-sm lg:text-base transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isOpen && user && (
          <div className="md:hidden pb-4 border-t border-indigo-700">
            <Link
              to="/products"
              className="block hover:bg-indigo-700 px-3 py-2 rounded-md text-base"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <div className="px-3 py-2 text-base">
              <span>{user.fullname}</span>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-base transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
