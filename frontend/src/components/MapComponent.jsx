import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import PopupModal from "./PopupModal"; 
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/location/locationSlice";
import { useNavigate } from "react-router-dom";

const MapComponent = ({ allowLocation, enableSearch }) => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [locationString, setLocationString] = useState("Loading...");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const libraries = ["places"]; 
  const mapContainerStyle = { width: "100%", height: "400px" };
  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; 

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const fetchLocationString = async (lat, lng) => {
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        setLocationString(data.results[0].formatted_address);
      } else {
        setLocationString("Address not found");
      }
    } catch (error) {
      console.error("Error fetching location string:", error);
      setLocationString("Error fetching address");
    }
  };

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    fetchLocationString(lat, lng);
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
          fetchLocationString(userLocation.lat, userLocation.lng);
        },
        (error) => {
          toast.error("Location permission blocked");
          console.error("Geolocation error:", error.message);
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
        fetchLocationString(location.lat, location.lng);
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

  const handleProceed = () => {
    if (!markerPosition) {
      toast.error("No location selected");
      return;
    }

    const { lat, lng } = markerPosition;

    dispatch(
      setLocation({
        locationString,
        lat,
        lng,
      })
    );

    toast.success(`Proceeding with location: ${locationString}`);
    navigate("/save-address");
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

      <div className="mt-4 text-center">
        <span className="text-lg font-semibold">Pinned Location:</span>
        <p className="text-gray-600">{locationString}</p>
      </div>

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

      <button
        onClick={allowLocation ? handleLocateMe : handleEnableLocateMe}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md"
      >
        {allowLocation ? "Locate Me" : "Enable & Locate Me"}
      </button>

      {markerPosition && (
        <button
          onClick={handleProceed}
          className="absolute bottom-4 right-2 transform -translate-x-1/2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md"
        >
          Proceed
        </button>
      )}

      <PopupModal
        isVisible={isModalOpen}
        onAllowLocation={handleAllowLocation}
        onManualSearch={handleManualSearch}
      />
    </div>
  );
};

export default MapComponent;
