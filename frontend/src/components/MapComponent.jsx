import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import PopupModal from "./PopupModal"; 
import { toast } from "react-toastify";

const MapComponent = ({ allowLocation, enableSearch }) => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const libraries = ["places"]; 
  const mapContainerStyle = { width: "100%", height: "400px" };
  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; 

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onDragEnd = (event) => {
    const position = event.latLng;
    setMarkerPosition({ lat: position.lat(), lng: position.lng() });
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(userLocation);
          map.panTo(userLocation);
        },
        (error) => {
            toast.error("location permission blocked")
            console.error("Geolocation error:", error.message)
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleAutocomplete = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(location);
        map.panTo(location);
      }
    }
  };

  const handleEnableLocateMe = () => {
    setIsModalOpen(true); 
  };

  const handleAllowLocation = () => {
    setIsModalOpen(false); 
    handleLocateMe(); 
  };

  const handleManualSearch = () => {
    setIsModalOpen(false); 
    enableSearch(); 
  };

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={markerPosition || defaultCenter}
        onLoad={onLoad}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable
            onDragEnd={onDragEnd}
          />
        )}
      </GoogleMap>

      {enableSearch && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md p-2 rounded-lg">
          <Autocomplete
            onLoad={(autoCompInstance) => setAutocomplete(autoCompInstance)}
            onPlaceChanged={handleAutocomplete}
          >
            <input
              type="text"
              placeholder="Search a location..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </Autocomplete>
        </div>
      )}

      <button
        onClick={allowLocation ? handleLocateMe : handleEnableLocateMe}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md"
      >
        {allowLocation ? "Locate Me" : "Enable & Locate Me"}
      </button>

      <PopupModal
        isVisible={isModalOpen}
        onAllowLocation={handleAllowLocation}
        onManualSearch={handleManualSearch}
      />
    </div>
  );
};

export default MapComponent;
