import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PopupModal from "../components/PopupModal";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(false);

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            setLocationAllowed(true);
          } else {
            setIsModalOpen(true);
          }
        })
        .catch(() => {
          setIsModalOpen(true); // If query fails, show the modal
        });
    } else {
      setIsModalOpen(true); // For unsupported browsers, show the modal
    }
  }, []);

  // Handle location permission
  const handleAllowLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("User's location:", position.coords);
        setLocationAllowed(true);
        setIsModalOpen(false);
      },
      (error) => {
        console.error("Error obtaining location:", error.message);
      }
    );
  };

  // Handle manual search
  const handleManualSearch = () => {
    console.log("Redirecting to manual search...");
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar token="example_token" />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mt-8">
          Welcome to the Home Page!
        </h1>
      </main>

      {/* Modal Component */}
      <PopupModal
        isVisible={isModalOpen && !locationAllowed}
        onAllowLocation={handleAllowLocation}
        onManualSearch={handleManualSearch}
      />
    </div>
  );
};

export default HomePage;
