import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Map: React.FC = () => {
  const [pointA, setPointA] = useState<[number, number] | null>(null);
  const [pointB, setPointB] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<L.LatLngExpression[]>([]);

  const MapClickHandler = () => {
    useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng;
      if (!pointA) {
        setPointA([lat, lng]);
      } else if (!pointB) {
        setPointB([lat, lng]);
        fetchRoute(pointA, [lat, lng]);
      }
    });
    return null;
  };

  const fetchRoute = async (start: [number, number], end: [number, number]) => {
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full`
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const routeData = response.data.routes[0].geometry.coordinates;
        const latLngs = routeData.map(
          ([lng, lat]: [number, number]) => [lat, lng] as L.LatLngExpression
        );
        setRoute(latLngs);
      } else {
        console.error('No route found');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };
  return (
    <MapContainer
      center={[3.457283, -76.518934]}
      zoom={13}
      style={{ height: '50vh', width: '50%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      <Marker position={[3.438105, -76.518074]} icon={icon}>
        <Popup>f</Popup>
      </Marker>
      {pointA && (
        <Marker position={pointA} icon={icon}>
          <Popup>
            Punto A: {pointA[0]}, {pointA[1]}
          </Popup>
        </Marker>
      )}
      {pointB && (
        <Marker position={pointB} icon={icon}>
          <Popup>
            Punto B: {pointB[0]}, {pointB[1]}
          </Popup>
        </Marker>
      )}
      {route.length > 0 && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
};

export default Map;
