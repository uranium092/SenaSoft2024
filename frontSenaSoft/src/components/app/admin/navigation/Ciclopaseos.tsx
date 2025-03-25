import React, { useEffect, useState } from 'react';
import NavAd from './NavAdmin';
import { Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

interface BikeTour {
  id: number;
  distance: number;
  from: string;
  to: string;
  date: string;
  description: string;
  fromLg: number;
  fromLt: number;
  toLg: number;
  toLt: number;
}

const Ciclopaseos: React.FC = () => {
  const [bikeTours, setBikeTours] = useState<BikeTour[]>([]);
  const goTo = useNavigate();

  useEffect(() => {
    const getAllCiclopaseos = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + '/ciclopaseo/getAll');
        if (!response.ok) throw new Error('Error al obtener datos');
        const body = await response.json();
        setBikeTours(body);
      } catch (error: any) {
        alert('Error: su solicitud no se pudo procesar');
      }
    };
    getAllCiclopaseos();
  }, []);

  const removeBikeTour = async (id: number) => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_URL + `/ciclopaseo/remove/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error on delete');
      setBikeTours((prev) => prev.filter((c) => c.id !== id));
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Unexpected error');
    }
  };

  useEffect(() => () => sessionStorage.removeItem('dataMap'), []);

  return (
    <>
      <NavAd initialValue="ciclopaseos" />
      <Button
        variant="contained"
        style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}
        className="my-3"
        onClick={() => goTo('/admin/nuevoCicloPaseo')}
      >
        <AddIcon />
        Nuevo Ciclopaseo
      </Button>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center',
        }}
      >
        {bikeTours.map((c) => (
          <Card sx={{ maxWidth: 345 }} key={c.id}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {c.distance} km
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Desde: {c.from} <br />
                Hasta: {c.to}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Fecha: {dayjs(c.date).format('DD-MMMM-YYYY, hh:mm A')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Descripción: {c.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                color="error"
                onClick={() => removeBikeTour(c.id)}
              >
                Eliminar
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Ciclopaseos;
