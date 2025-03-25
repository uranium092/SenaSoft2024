import { Typography, Button } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import RefreshIcon from '@mui/icons-material/Refresh';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Coordinates = [number, number];
interface DataRoute {
  from: string;
  to: string;
  distance: number;
}

interface DataForm {
  date: string;
  description: string;
  fromLt?: number;
  fromLg?: number;
  toLt?: number;
  toLg?: number;
  distance?: number;
}

const MapClickHandler: React.FC<{
  setPointA: Function;
  setPointB: Function;
  fetchRoute: Function;
  pointA: Coordinates | null;
}> = ({ setPointA, setPointB, fetchRoute, pointA }) => {
  useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng;
    if (!pointA) {
      setPointA([lat, lng]);
    } else {
      setPointB([lat, lng]);
      fetchRoute(pointA, [lat, lng]);
    }
  });
  return null;
};

const AddCiclopaseo: React.FC = () => {
  const [pointA, setPointA] = useState<Coordinates | null>(null);
  const [pointB, setPointB] = useState<Coordinates | null>(null);
  const [dataRoute, setDataRoute] = useState<DataRoute>({
    from: '...',
    to: '...',
    distance: 0,
  });
  const [dataForm, setDataForm] = useState<DataForm>({ date: '', description: '' });

  const fetchRoute = async (start: Coordinates, end: Coordinates) => {
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full`
      );

      const { waypoints, routes } = response.data;
      if (!routes.length) throw new Error('No route found');

      setDataRoute({
        from: waypoints[0].name,
        to: waypoints[1].name,
        distance: +(routes[0].distance / 1000).toFixed(2),
      });

      setDataForm((prev) => ({
        ...prev,
        fromLt: waypoints[0].location[0],
        fromLg: waypoints[0].location[1],
        toLt: waypoints[1].location[0],
        toLg: waypoints[1].location[1],
        distance: +(routes[0].distance / 1000).toFixed(2),
      }));
    } catch (error: any) {
      console.error(error);
      if (error.message === 'Network Error') {
        return window.location.reload();
      }
      alert(error.message || 'Unexpected Error');
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      await fetch(import.meta.env.VITE_SERVER_URL + '/ciclopaseo/newCiclopaseo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dataForm, ...dataRoute }),
      });
    } catch (error) {
      alert('Error: su solicitud no se pudo procesar');
    } finally {
      navigate('/admin/ciclopaseos');
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" className="my-3">
        Agregar Ciclopaseo
      </Typography>
      <form
        style={{
          borderRadius: 15,
          border: '1px solid blue',
          padding: 30,
          width: '50%',
          margin: 'auto',
        }}
      >
        <Typography variant="h6">Fecha Inicio:</Typography>
        <input
          type="datetime-local"
          name="date"
          required
          min={dayjs().add(1, 'day').startOf('day').format('YYYY-MM-DDTHH:mm')}
          onChange={(e) => setDataForm({ ...dataForm, date: e.target.value })}
        />
        <br />
        <br />
        <Typography variant="h6">Descripción:</Typography>
        <Textarea
          required
          minRows={3}
          sx={{ width: '70%', margin: 'auto' }}
          placeholder="Descripción para ciclopaseo"
          name="description"
          onChange={(e) => setDataForm({ ...dataForm, description: e.target.value })}
        />
      </form>
      <Typography variant="h5" align="center" className="my-3">
        Seleccionar recorrido:
      </Typography>
      <MapContainer
        center={[3.457283, -76.518934]}
        zoom={13}
        style={{ height: '50vh', width: '50%', margin: 'auto' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler
          setPointA={setPointA}
          setPointB={setPointB}
          fetchRoute={fetchRoute}
          pointA={pointA}
        />
        {pointA && (
          <Marker position={pointA} icon={icon}>
            <Popup>Punto inicial</Popup>
          </Marker>
        )}
        {pointB && (
          <Marker position={pointB} icon={icon}>
            <Popup>Punto destino</Popup>
          </Marker>
        )}
      </MapContainer>
      <div
        style={{
          border: '1px solid blue',
          borderRadius: 15,
          position: 'absolute',
          padding: 30,
          top: '63vh',
          right: 40,
        }}
      >
        <Typography variant="h6">
          <b>Desde:</b> {dataRoute.from}
        </Typography>
        <Typography variant="h6">
          <b>Hasta:</b> {dataRoute.to}
        </Typography>
        <Typography variant="h6">
          <b>Total recorrido:</b> {dataRoute.distance} km
        </Typography>
      </div>
      <Button
        variant="contained"
        sx={{ width: '50%', display: 'block', margin: 'auto' }}
        onClick={handleSubmit}
      >
        Crear Ciclopaseo
      </Button>
      <RefreshIcon
        sx={{ fontSize: '3rem', position: 'fixed', bottom: 0, cursor: 'pointer' }}
        onClick={() => window.location.reload()}
      />
    </>
  );
};

export default AddCiclopaseo;
