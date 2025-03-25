import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MonitoringMap: React.FC = () => {
  return (
    <MapContainer
      center={[
        JSON.parse(sessionStorage.getItem('dataMap') || '{}').fromLg,
        JSON.parse(sessionStorage.getItem('dataMap') || '{}').fromLt,
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
          JSON.parse(sessionStorage.getItem('dataMap') || '{}').fromLg,
          JSON.parse(sessionStorage.getItem('dataMap') || '{}').fromLt,
        ]}
        icon={icon}
      >
        <Popup>Actual</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MonitoringMap;
