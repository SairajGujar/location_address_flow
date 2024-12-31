
import React from "react";

const PopupModal = ({ isVisible, onAllowLocation, onManualSearch }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-4">Allow Location Permission</h2>
        <p className="text-gray-600 mb-6">
          We need your location to provide better services. Please choose an
          option below.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onManualSearch}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            Search Manually
          </button>
          <button
            onClick={onAllowLocation}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Allow Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
