// src/components/LiveTracking.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [35, 35],
});

// Helper component to recenter map whenever position changes
function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 16); // zoom level 16
    }
  }, [position, map]);
  return null;
}

const LiveTracking = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Start watching geolocation
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          console.log("User position:", pos.coords.latitude, pos.coords.longitude);
        },
        (err) => console.error("Location error:", err),
        { enableHighAccuracy: true }
      );

      // Cleanup → stop watching when component unmounts
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert("Geolocation not supported by your browser.");
    }
  }, []);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={position || { lat: 28.6139, lng: 77.209 }} // fallback Delhi
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Show marker only if position available */}
        {position && (
          <>
            <Marker position={position} icon={userIcon}>
              <Popup>📍 You are here</Popup>
            </Marker>
            <Recenter position={position} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default LiveTracking;
