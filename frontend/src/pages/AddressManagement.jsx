import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { deleteAddress, editAddress, fetchAddresses } from "../apis/location";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editedHouseNumber, setEditedHouseNumber] = useState("");
  const [editedRoadArea, setEditedRoadArea] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses()
      .then((response) => {
        if (response.success === true) {
          console.log(response);
          toast.success("Addresses fetched");
          setAddresses(response.data);
        } else {
          toast.error("Error fetching addresses");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleAddAddress = () => {
    navigate("/");
  };

  const handleEditAddress = (address) => {
    setEditMode(true);
    setSelectedAddress(address);
    setEditedHouseNumber(address.houseNumber || "");
    setEditedRoadArea(address.landMark || "");

    
  };

  const handleSaveEdit = () => {
    const updatedAddress = {
      ...selectedAddress,
      houseNumber: editedHouseNumber,
      landMark: editedRoadArea,
    };

    editAddress(updatedAddress, selectedAddress._id) 
      .then((response) => {
        if (response.success === true) {
          toast.success("Address updated successfully");
          setAddresses((prevAddresses) =>
            prevAddresses.map((addr) =>
              addr._id === selectedAddress._id ? updatedAddress : addr
            )
          );
          setEditMode(false);
          setSelectedAddress(null);
        } else {
          toast.error("Error updating address");
        }
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Error updating address");
      });
  };

  const handleDeleteAddress = async (id) => {
    deleteAddress(id)
      .then((response) => {
        if (response.success === true) {
          toast.success("Address deleted");
          window.location.reload();
        } else {
          toast.error("Error deleting address");
        }
      })
      .catch((error) => {

        console.log(error.message);
      });
  };

  return (
    <div>
      <Navbar token={localStorage.getItem("token")}></Navbar>
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Address Management</h2>
          <button
            onClick={handleAddAddress}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add New Address
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Saved Addresses</h3>
          <ul className="mt-4 space-y-2">
            {addresses.map((address) => (
              <li key={address._id} className="border-b pb-2">
                <div className="text-lg font-medium">{address.addressType}</div>
                <div className="text-md text-gray-800">{address.location}</div>
                <div className="text-md text-gray-800">{address.houseNumber}</div>
                <div className="text-md text-gray-800">{address.landMark}</div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h3 className="text-lg font-semibold mb-4">Edit Address</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                House/Flat/Block No.
              </label>
              <input
                type="text"
                value={editedHouseNumber}
                onChange={(e) => setEditedHouseNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Apartment/Road/Area
              </label>
              <input
                type="text"
                value={editedRoadArea}
                onChange={(e) => setEditedRoadArea(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManagement;
