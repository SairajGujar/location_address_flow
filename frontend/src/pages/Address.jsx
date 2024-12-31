import React, { useState } from "react";
import { FaHome, FaBuilding, FaUserFriends, FaMapPin } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { createAddress } from "../apis/location";
import { toast } from "react-toastify";

const SaveAddress = () => {
  const location = useSelector((state) => state.location.location);

  const [houseNumber, setHouseNumber] = useState("");
  const [apartment, setApartment] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!houseNumber || !apartment || !selectedType) {
      alert("Please fill out all fields and select an address type!");
      return;
    }
    const address = {
      houseNumber,
      apartment,
      type: selectedType,
      location,
    }
    createAddress(address)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Address saved successfully!");
        } else {
          toast.error("Failed to save address!");
        }
      })
      .catch((error) => {
        console.error("Error saving address:", error);
        toast.error("Failed to save address!");
      });
  };

  const handleIconClick = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      <Navbar token="example_token" />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-2 text-blue-500">
            <FaMapPin size={20} />
            <span className="text-lg font-semibold">{location}</span>
          </div>
        </div>

        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Add Address Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                House/Flat/Block No.
              </label>
              <input
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="Enter house or flat number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Apartment/Road/Area
              </label>
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                placeholder="Enter apartment, road, or area"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <h3 className="text-gray-700 font-medium mb-2">Save as</h3>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleIconClick("Home")}
                  className={`flex flex-col items-center ${
                    selectedType === "Home" ? "text-blue-500" : "text-gray-700"
                  } hover:text-blue-500`}
                >
                  <FaHome size={24} />
                  <span className="text-sm mt-1">Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleIconClick("Office")}
                  className={`flex flex-col items-center ${
                    selectedType === "Office" ? "text-blue-500" : "text-gray-700"
                  } hover:text-blue-500`}
                >
                  <FaBuilding size={24} />
                  <span className="text-sm mt-1">Office</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleIconClick("Friends")}
                  className={`flex flex-col items-center ${
                    selectedType === "Friends" ? "text-blue-500" : "text-gray-700"
                  } hover:text-blue-500`}
                >
                  <FaUserFriends size={24} />
                  <span className="text-sm mt-1">Friends</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SaveAddress;
