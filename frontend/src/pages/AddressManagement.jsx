import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [addressType, setAddressType] = useState('home');
  const [editMode, setEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Simulating an API call to fetch saved addresses
  useEffect(() => {
    // Replace with actual API call to fetch addresses
    const fetchAddresses = async () => {
      // Sample data
      const fetchedAddresses = [
        { id: 1, address: '123 Main St', type: 'home' },
        { id: 2, address: '456 Elm St', type: 'office' },
        { id: 3, address: '789 Oak St', type: 'friends' },
      ];
      setAddresses(fetchedAddresses);
    };

    fetchAddresses();
  }, []);

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setAddresses([
        ...addresses,
        { id: addresses.length + 1, address: newAddress, type: addressType },
      ]);
      setNewAddress('');
    }
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setNewAddress(address.address);
    setAddressType(address.type);
    setEditMode(true);
  };

  const handleUpdateAddress = () => {
    if (newAddress.trim()) {
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address.id === selectedAddress.id
            ? { ...address, address: newAddress, type: addressType }
            : address
        )
      );
      setNewAddress('');
      setAddressType('home');
      setEditMode(false);
    }
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <div>
      <Navbar token={`example token`}></Navbar>
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
            <li key={address.id} className="border-b pb-2">
              <div className="text-sm font-medium">{address.address}</div>
              <div className="text-xs text-gray-500">{address.type}</div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditAddress(address)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
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
    </div>
  );
};

export default AddressManagement;
