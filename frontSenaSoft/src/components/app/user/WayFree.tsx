import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Bike {
  brand: string;
  image: string;
  price: number;
}

const WayFree: React.FC = () => {
  const [pointA, setPointA] = useState<[number, number] | null>(null);
  const [pointB, setPointB] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<L.LatLngExpression[]>([]);
  const [dataRoute, setDataRoute] = useState({
    from: '...',
    to: '...',
    km: 0,
  });
  const [bike, setBike] = useState<Bike>({ image: '', brand: '', price: 0 });
  const [amountMoney, setAmountMoney] = useState({ visible: false, tt: 0 });
  const [dataServer, setDataServer] = useState({});

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
      if (!sessionStorage.getItem('user')) {
        return alert('Sin Credenciales');
      }
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full`
      );

      setDataRoute({
        from: response.data.waypoints[0].name,
        to: response.data.waypoints[1].name,
        km: +(response.data.routes[0].distance / 1000).toFixed(2),
      });
      console.log(response.data);
      const payTotal = +(response.data.routes[0]?.distance / 1000).toFixed(2) * bike.price;
      setAmountMoney({
        visible: true,
        tt: payTotal,
      });

      setDataServer({
        from: response.data.waypoints[0].name,
        to: response.data.waypoints[1].name,
        distance: +(response.data.routes[0].distance / 1000).toFixed(2),
        type: 'free',
        fromLt: response.data.waypoints[0].location[0],
        fromLg: response.data.waypoints[0].location[1],
        toLt: response.data.waypoints[1].location[0],
        toLg: response.data.waypoints[1].location[1],
        idUser: JSON.parse(sessionStorage.getItem('user') || '{}').id,
        statusUser: JSON.parse(sessionStorage.getItem('user') || '{}').status,
        total: payTotal,
      });
      if (response.data.routes && response.data.routes.length > 0) {
        const routeData = response.data.routes[0].geometry.coordinates;
        const latLngs = routeData.map(
          ([lng, lat]: [number, number]) => [lat, lng] as L.LatLngExpression
        );
        setRoute(latLngs);
      } else {
        console.error('No route found');
      }
    } catch (error: any) {
      console.log(error);
      if (error.message == 'Network Error') window.location.reload();
    }
  };
  const params = useParams();
  useEffect(() => {
    const getBike = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER_URL + '/bike/bikeById/' + params.id
        );
        const body = await response.json();
        setBike(body);
      } catch (err) {
        setBike({ image: '', brand: '', price: 0 });
        alert('Error: su solicitud no se pudo procesar');
      }
    };
    getBike();
  }, []);
  const goTo = useNavigate();
  return (
    <>
      <Typography variant="h4" className="text-center mb-3">
        Seleccionado: Ruta Libre
      </Typography>
      <div hidden={!amountMoney.visible} style={{ position: 'absolute', right: '40px' }}>
        <Typography variant="h6">Total Pagar: {amountMoney.tt} </Typography>
        <Button
          variant="outlined"
          sx={{ width: '100%' }}
          onClick={async () => {
            try {
              if (!sessionStorage.getItem('user')) {
                return alert('Sin Credenciales');
              }
              await fetch(import.meta.env.VITE_SERVER_URL + '/bike/rentBike/' + params.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataServer),
              });
              goTo('/user/' + JSON.parse(sessionStorage.getItem('user') || '{}').id);
            } catch (err) {
              alert('Error: su solicitud no se pudo procesar');
            }
          }}
        >
          Reservar
        </Button>
      </div>
      <Card sx={{ width: 285, position: 'absolute' }}>
        <CardMedia sx={{ height: 140 }} image={bike.image} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {bike.brand}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ${bike.price}/km
          </Typography>
        </CardContent>
      </Card>
      <MapContainer
        center={[3.43722, -76.5225]}
        zoom={13}
        style={{ height: '60vh', width: '60%', margin: 'auto' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {pointA && (
          <Marker position={pointA} icon={icon}>
            <Popup>Punto Partida</Popup>
          </Marker>
        )}
        {pointB && (
          <Marker position={pointB} icon={icon}>
            <Popup>Punto Destino</Popup>
          </Marker>
        )}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
      <div
        style={{
          display: 'flex',
          width: '60%',
          margin: 'auto',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5">Desde: {dataRoute.from}</Typography>
        <Typography variant="h5">Hasta: {dataRoute.to}</Typography>
      </div>
      <div>
        <Typography variant="h5" className="text-center">
          Distancia: {dataRoute.km}km
        </Typography>
      </div>
      <Button
        sx={{ width: '60%', margin: 'auto', display: 'block', marginTop: '10px' }}
        variant="outlined"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reiniciar
      </Button>
    </>
  );
};

export default WayFree;
