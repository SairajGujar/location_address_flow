import React from "react";
import { Link } from "react-router-dom"; 

const Navbar = ({ token }) => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link to="/">OptaCloud</Link>
        </div>

        <div className="hidden md:flex space-x-4">
          {token && (
            <Link to="/manage-address" className="hover:text-gray-300">
              Manage Address
            </Link>
          )}
        </div>

        <div>
          {token ? (
            <button
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full"
              onClick={() => alert("Profile Clicked")}
            >
              <img
                src="https://via.placeholder.com/32"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>Profile</span>
            </button>
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
