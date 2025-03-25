import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { Typography } from '@mui/material';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface mapProps {
  data: string;
}

const DataServiceMap: React.FC<mapProps> = ({ data }) => {
  return (
    <>
      <MapContainer
        center={[JSON.parse(data).dataReserved.fromLg, JSON.parse(data).dataReserved.fromLt]}
        zoom={13}
        style={{ height: '50vh', width: '50%', margin: 'auto' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[JSON.parse(data).dataReserved.fromLg, JSON.parse(data).dataReserved.fromLt]}
          icon={icon}
        >
          <Popup>Punto inicial</Popup>
        </Marker>
        <Marker
          position={[JSON.parse(data).dataReserved.toLg, JSON.parse(data).dataReserved.toLt]}
          icon={icon}
        >
          <Popup>Punto destino</Popup>
        </Marker>
      </MapContainer>
      <div
        style={{
          display: 'flex',
          width: '50%',
          margin: 'auto',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5">Desde: {JSON.parse(data).dataReserved.from}</Typography>
        <Typography variant="h5">Hasta: {JSON.parse(data).dataReserved.to}</Typography>
      </div>
      <div className="mb-5">
        <Typography variant="h5" className="text-center">
          Distancia: {JSON.parse(data).dataReserved.distance}km
        </Typography>
      </div>
    </>
  );
};

export default DataServiceMap;
