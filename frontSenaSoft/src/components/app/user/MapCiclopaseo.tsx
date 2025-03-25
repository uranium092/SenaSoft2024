import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapCiclopaseo: React.FC = () => {
  return (
    <MapContainer
      center={[
        JSON.parse(sessionStorage.getItem('dataMap') || '{}')?.fromLg || 0,
        JSON.parse(sessionStorage.getItem('dataMap') || '{}')?.fromLt || 0,
      ]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[
          JSON.parse(sessionStorage.getItem('dataMap') || '{}')?.fromLg || 0,
          JSON.parse(sessionStorage.getItem('dataMap') || '{}')?.fromLt || 0,
        ]}
        icon={icon}
      >
        <Popup>Punto inicial</Popup>
      </Marker>
      <Marker
        position={[
          JSON.parse(sessionStorage.getItem('dataMap') || '{}')?.toLg || 0,
          JSON.parse(sessionStorage.getItem('dataMap') || '{}')?.toLt || 0,
        ]}
        icon={icon}
      >
        <Popup>Punto final</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapCiclopaseo;
