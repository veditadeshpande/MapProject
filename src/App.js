import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet library
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useState, useEffect } from 'react';
import icon from 'leaflet/dist/images/marker-icon.png'

// Create a custom marker icon
const customMarkerIcon = new L.Icon({
  iconUrl: icon,
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32], // Popup anchor point
});

function App() {
  const constantPositions = [
    [33.8704, -117.9242],
    [34.0549, -118.2426],
    [33.770050, -118.193741],
    [33.6424, -117.8417],
  ];

  const routeCoordinates = [
    [33.8704, -117.9242], // Start coordinate
    [34.0549, -118.2426], // End coordinate
  ];
  const routeCoordinates2 = [ 
    [33.8704, -117.9242],
    [33.6424, -117.8417],
  ];

  return (
    <div className="col">
      <MapContainer center={constantPositions[0]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=GSifio1YoG2l3lcMqzrJ"
        />
        {constantPositions.map((position, index) => (
          <Marker key={index} position={position} icon={customMarkerIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <Polyline positions={routeCoordinates} color="blue" />
        <Polyline positions={routeCoordinates2} color="blue" />
      </MapContainer>
    </div>
  );
}

export default App;
