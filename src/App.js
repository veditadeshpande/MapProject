import './App.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet library
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useState, useEffect } from 'react';
import icon from 'leaflet/dist/images/marker-icon.png'
import axios from 'axios';


// Create a custom marker icon
const customMarkerIcon = new L.Icon({
  iconUrl: icon,
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32], // Popup anchor point
});

const locations = [
  { name: 'Fullerton', lat: 33.8704, lon: -117.9242 },
  { name: 'Long Beach', lat: 33.770050, lon: -118.193741 },
  { name: 'Brea', lat: 33.915279, lon: -117.888207 },
  { name: 'Placentia', lat: 33.871075, lon: -117.862755 },
  { name: 'Yorba Linda', lat: 33.888531, lon: -117.824310 },
  { name: 'Bueuna Park', lat: 33.869110, lon: -117.993952 },
  { name: 'Cerritos', lat: 33.862607, lon: -118.052657 },
  { name: 'Anaheim', lat: 33.836594, lon: -117.914299},
  { name: 'Norwalk', lat: 33.913780, lon: -118.070099 },
  { name: 'Bellflower', lat: 33.881683, lon: -118.117012 },
  { name: 'La Mirada', lat: 33.908989, lon: -118.009949 },
  { name: 'Lakewood', lat: 33.853626, lon: -118.133957 },
  { name: 'Los Alamitos', lat: 33.804970, lon: -118.071800 },
  { name: 'Seal Beach', lat: 33.741409, lon: -118.104767 },
  { name: 'La Habra', lat: 33.931858, lon: -117.946136 },
  { name: 'Garden Grove', lat: 33.774269, lon: -117.937996 },
  { name: 'Santa Ana', lat: 33.745472, lon: -117.867653 },
  { name: 'Carson', lat: 33.827820, lon: -118.272346 },
  { name: 'Chino Hills', lat: 33.991200, lon: -117.760861 },
  { name: 'Diamond Bar', lat: 34.026490, lon: -117.810264 },
];

function App() {
  const constantPositions = [
    [33.8704, -117.9242],
  ];

function printDistanceMatrix(matrix) {
    const numLocations = matrix.length;
  
    // Print column headers
    let header = '         '; // Extra spaces for alignment
    for (let j = 0; j < numLocations; j++) {
      header += `Location ${j}    `;
    }
    console.log(header);
  
    // Print the matrix rows
    for (let i = 0; i < numLocations; i++) {
      let row = `Location ${i}  `;
      for (let j = 0; j < numLocations; j++) {
        row += `${matrix[i][j].toFixed(2)} km    `;
      }
      console.log(row);
    }
}

useEffect(()=>{
  async function fetchDataFromServer() {
    const apiUrl = 'http://localhost:5000/data'; // Replace 'items' with your resource name
  
    try {
      const response = await axios.get(apiUrl);
      const distanceMatrix = response.data; // This contains the retrieved data
      printDistanceMatrix(distanceMatrix);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchDataFromServer();
},[])
  
  return (
    <div className="col">
      <MapContainer center={constantPositions[0]} zoom={11} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=GSifio1YoG2l3lcMqzrJ"
        />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lon]} icon={customMarkerIcon}>
            <Popup>
              {location.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
