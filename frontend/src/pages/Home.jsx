import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PopupModal from "../components/PopupModal";
import MapComponent from "../components/MapComponent";
import { toast } from "react-toastify";


const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [manualSearch, setManualSearch] = useState(false);

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
          setIsModalOpen(true);
        });
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleAllowLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("User's location:", position.coords);
        setLocationAllowed(true);
        setIsModalOpen(false);
        toast.success("location fetched successfully");
      },
      (error) => {
        toast.error("location permission blocked");

        console.error("Error obtaining location:", error.message);
      }
    );
  };

  const handleManualSearch = () => {
    setManualSearch(true);
    setIsModalOpen(false);
  };
  
  return (
    <div>
      <Navbar token={localStorage.getItem('token')} />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mt-8">
          Welcome to the Home Page!
        </h1>
        <div className="mt-8">
          <MapComponent
            allowLocation={locationAllowed}
            enableSearch={manualSearch}
          />
        </div>
      </main>

      <PopupModal
        isVisible={isModalOpen}
        onAllowLocation={handleAllowLocation}
        onManualSearch={handleManualSearch}
      />
    </div>
  );
};

export default HomePage;
