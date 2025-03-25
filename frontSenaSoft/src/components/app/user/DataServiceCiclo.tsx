import { Button, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataServiceMap from './DataServiceMap';
import { Card, CardMedia } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

interface propsData {
  data: string;
}

const generateDiscount = (status: number) => {
  type statusesModel = {
    [key: number]: number;
  };
  const statuses: statusesModel = { 1: 0.1, 2: 0.1, 3: 0.05, 4: 0.05 };
  return statuses[status] || 0;
};

const DataServiceCiclo: React.FC<propsData> = ({ data }) => {
  const [coordenates, setCoordenates] = useState('...');
  const [discount, setDiscount] = useState(0);
  useEffect(() => {
    if (data != '---') {
      let tt = JSON.parse(data).dataReserved.total;
      tt = tt - tt * generateDiscount(JSON.parse(sessionStorage.getItem('user') || '{}').status);
      setDiscount(tt);
    }
  }, [data]);
  useEffect(() => {
    const getCoordenates = async () => {
      if (!sessionStorage.getItem('user')) {
        return alert('Sin Credenciales');
      }
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL +
          '/ciclopaseo/findById/' +
          JSON.parse(data).dataReserved.idCiclo
      );
      let body = await response.json();
      body = { dataReserved: body };
      setCoordenates(JSON.stringify(body));
    };
    getCoordenates();
  }, []);
  return (
    <>
      <Typography variant="h4" className="text-center mb-2">
        ¡Ya tienes un servicio!
      </Typography>
      <hr style={{ width: '70%', margin: 'auto' }} />
      <Button
        variant="contained"
        sx={{ width: '40%', display: 'block', margin: '20px auto' }}
        onClick={async () => {
          try {
            if (!sessionStorage.getItem('user')) {
              return alert('Sin Credenciales');
            }
            await fetch(
              import.meta.env.VITE_SERVER_URL +
                `/bike/removeRent/${JSON.parse(data).id}/${discount}`,
              {
                method: 'PUT',
              }
            );
            window.location.reload();
          } catch (err) {
            alert('Error: su solicitud no se pudo procesar');
          }
        }}
      >
        Dar de Baja
      </Button>
      <Card sx={{ width: 325, margin: '20px auto' }}>
        <CardMedia
          component="img"
          alt="image content"
          height="140"
          image={JSON.parse(data).image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className="text-center">
            {JSON.parse(data).brand}
          </Typography>
          <Typography variant="h6" sx={{ color: 'blue', fontWeight: 'bold', textAlign: 'center' }}>
            ${JSON.parse(data).price}/km
          </Typography>
        </CardContent>
      </Card>

      <Typography className="text-center" variant="h5">
        Tipo: Alquiler Ciclopaseos
      </Typography>

      <Typography className="text-center mt-3" variant="h6">
        Creado el {dayjs(JSON.parse(data).dataReserved.dateInit).format('DD-MMMM-YYYY[, ]hh[:]mmA')}
      </Typography>
      <Typography className="text-center" variant="h6">
        Total a pagar:{' '}
        <span style={{ textDecoration: 'line-through', color: 'red' }}>
          ${JSON.parse(data).dataReserved.total}
        </span>
      </Typography>
      <Typography className="text-center" variant="h6">
        Total con descuento:
        <span style={{ color: 'green', fontWeight: 'bolder' }}>
          ${isNaN(discount) ? JSON.parse(data).dataReserved.total : discount}
        </span>
      </Typography>

      {coordenates != '...' && <DataServiceMap data={coordenates} />}
    </>
  );
};

export default DataServiceCiclo;
