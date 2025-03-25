import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

interface Bike {
  brand: string;
  image: string;
  price: number;
}

interface BikeTours {
  id: number;
  date: string;
  description: string;
  from: string;
  to: string;
  fromLt: number;
  fromLg: number;
  toLt: number;
  toLg: number;
  distance: number;
}

const CiclopaseosUser: React.FC = () => {
  const params = useParams();
  const [ciclopaseos, setCiclopaseos] = useState<BikeTours[]>([]);
  const [bike, setBike] = useState<Bike>({ brand: '...', image: '', price: 0 });
  const goTo = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionStorage.getItem('user')) {
          return alert('Sin Credenciales');
        }
        const [infoBike, allBikeTours] = await Promise.all([
          fetch(import.meta.env.VITE_SERVER_URL + '/bike/bikeById/' + params.idBike).then((res) =>
            res.json()
          ),
          fetch(import.meta.env.VITE_SERVER_URL + '/ciclopaseo/getAll').then((res) => res.json()),
        ]);
        setBike(infoBike);
        setCiclopaseos(allBikeTours);
      } catch (err) {
        setBike({ brand: '...', image: '', price: 0 });
        setCiclopaseos([]);
        alert('Error: su solicitud no se pudo procesar');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h4" className="text-center my-3">
        Seleccionar Ciclopaseos
      </Typography>
      <Card sx={{ maxWidth: 345, margin: 'auto' }} className="my-4">
        <CardMedia sx={{ height: 140 }} image={bike.image} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {bike.brand}
          </Typography>
          <Typography variant="h6" sx={{ color: 'blue' }}>
            {'$' + bike.price}/km
          </Typography>
        </CardContent>
      </Card>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {ciclopaseos.map((c) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {c.distance}km
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Desde: {c.from} <br />
                Hasta: {c.to}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Fecha: {dayjs(c.date).format('DD-MMMM-YYYY[, ]hh[:]mmA')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Descripcion: {c.description}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <span style={{ fontWeight: 'bold' }}>Total:</span>{' '}
                {(bike?.price || 0) * (c?.distance || 0)}$
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  const bodySession = {
                    fromLg: c.fromLg,
                    fromLt: c.fromLt,
                    toLg: c.toLg,
                    toLt: c.toLt,
                  };
                  sessionStorage.setItem('dataMap', JSON.stringify(bodySession));
                  window.open('/mapa', '_blank', 'popup');
                }}
              >
                Ver Mapa
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={async () => {
                  if (!sessionStorage.getItem('user')) {
                    return alert('Sin Credenciales');
                  }
                  const bodyRent = {
                    type: 'ciclo',
                    idUser: JSON.parse(sessionStorage.getItem('user') || '{}').id,
                    statusUser: JSON.parse(sessionStorage.getItem('user') || '{}').status,
                    distance: c?.distance || 0,
                    total: (bike?.price || 0) * (c?.distance || 0),
                    idCiclo: c.id,
                  };
                  await fetch(import.meta.env.VITE_SERVER_URL + '/bike/rentBike/' + params.idBike, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bodyRent),
                  });
                  goTo('/user/' + JSON.parse(sessionStorage.getItem('user') || '{}').id);
                }}
              >
                Reservar
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CiclopaseosUser;
