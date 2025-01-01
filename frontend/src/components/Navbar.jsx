import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ token }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("logged out");
    window.location.replace('/');
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link to="/">Locate</Link>
        </div>

        <div className="hidden md:flex space-x-4">
          {token && (
            <Link to="/manage-address" className="hover:text-gray-300">
              Manage Address
            </Link>
          )}
        </div>

        <div className="relative">
          {token ? (
            <div>
              <button
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Profile
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-md z-10">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="md:hidden bg-gray-700">
        <div className="flex justify-center py-2">
          {token && (
            <Link to="/address" className="hover:text-gray-300">
              Manage Address
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
