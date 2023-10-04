// Map.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function TrafficMap() {
  const [markers, setMarkers] = useState([]);
  const [position, setPosition] = useState(null);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const newMarker = {
      id: new Date().getTime(), // Unique ID for each marker
      lat,
      lng,
    };

    // Add the new marker to the list of markers
    setMarkers([...markers, newMarker]);

    // Set the position for the Popup
    setPosition([lat, lng]);
  };

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Display markers on the map */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
          >
            <Popup>
              Marker at: {marker.lat}, {marker.lng}
            </Popup>
          </Marker>
        ))}

        {/* Display a Popup when a marker is clicked */}
        {position && (
          <Marker position={position}>
            <Popup>
              Clicked at: {position[0]}, {position[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default TrafficMap;
