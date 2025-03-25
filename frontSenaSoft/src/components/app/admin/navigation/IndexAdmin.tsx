import React, { useEffect, useState } from 'react';
import NavAd from './NavAdmin';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';

interface Bike {
  id: number;
  image: string;
  brand: string;
  status: boolean;
  price: number;
  dataReserved: {
    type: string;
    idCiclo: number;
    idUser: string;
    from: string;
    to: string;
    distance: string;
    total: number;
    statusUser: number;
  };
}

interface Dialog {
  open: boolean;
  dataBike: {
    image?: string;
    userId?: string;
    type?: string;
    totalKm?: string;
    price?: number;
    payTotal?: number;
    payWithDiscount?: number;
  };
}

const generateDiscount = (status: number) => {
  type statusesModel = {
    [key: number]: number;
  };
  const statuses: statusesModel = { 1: 0.1, 2: 0.1, 3: 0.05, 4: 0.05 };
  return statuses[status] || 0;
};

const IndexAdmin: React.FC = () => {
  const goTo = useNavigate();
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [dialog, setDialog] = useState<Dialog>({ open: false, dataBike: {} });
  useEffect(() => {
    const getAllBikes = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + '/bike/allBikes');
        const body = await response.json();
        setBikes(body);
      } catch (err) {
        setBikes([]);
        alert('Error: su solicitud no se pudo procesar');
      }
    };
    getAllBikes();
  }, []);
  return (
    <>
      <Dialog
        open={dialog.open}
        onClose={() => {
          setDialog({ open: false, dataBike: {} });
        }}
      >
        <DialogTitle>
          <img src={dialog?.dataBike?.image || ''} alt="" />
        </DialogTitle>
        <Typography variant="h6" className="text-center">
          UserId: {dialog?.dataBike?.userId || '...'}
        </Typography>
        <Typography variant="h6" className="text-center">
          Tipo renta: {dialog?.dataBike?.type || '...'}
        </Typography>
        <Typography variant="h6" className="text-center">
          Precio/Km: {(dialog?.dataBike?.price || '0') + '$'}
        </Typography>
        <Typography variant="h6" className="text-center">
          Total recorrido: {dialog?.dataBike?.totalKm} km
        </Typography>
        <Typography variant="h6" className="text-center">
          Total:{' '}
          <span style={{ textDecoration: 'line-through' }}>
            {(dialog?.dataBike?.payTotal || 0) + '$'}
          </span>{' '}
          &nbsp; {(dialog?.dataBike?.payWithDiscount || 0) + '$'}
        </Typography>
      </Dialog>

      <NavAd initialValue="Bikes" />
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          sx={{ margin: 'auto' }}
          onClick={() => goTo('/admin/aggBicicleta')}
        >
          Nueva Bicicleta
        </Button>
      </div>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}
        className="mt-4"
      >
        {bikes.map((b) => (
          <Card sx={{ maxWidth: 345 }} key={b.id}>
            <CardMedia component="img" height="160" image={b.image} alt="bike image" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {b.brand}
              </Typography>
              {b.status ? (
                <Typography variant="h6" style={{ color: 'red' }}>
                  En uso&nbsp;
                  <RemoveRedEyeIcon
                    sx={{ color: 'black', cursor: 'pointer' }}
                    onClick={() => {
                      const payTotal = b?.dataReserved?.total;

                      setDialog({
                        open: true,
                        dataBike: {
                          image: b?.image || '',
                          userId: b?.dataReserved?.idUser,
                          type: b?.dataReserved?.type === 'free' ? 'Libre' : 'Ciclopaseo',
                          totalKm: b?.dataReserved?.distance,
                          price: b?.price,
                          payTotal,
                          payWithDiscount:
                            payTotal -
                            payTotal * generateDiscount(b?.dataReserved?.statusUser || 0),
                        },
                      });
                    }}
                  />
                </Typography>
              ) : (
                <Typography variant="h6" style={{ color: 'green' }}>
                  Sin usar
                </Typography>
              )}
              <Typography variant="h5" sx={{ color: 'blue' }}>
                ${b.price}/km
              </Typography>
              {b.status && (
                <Button
                  variant="contained"
                  className="mt-2"
                  onClick={async () => {
                    try {
                      if (b.dataReserved.type == 'free') {
                        sessionStorage.setItem('dataMap', JSON.stringify(b.dataReserved));
                        window.open('/monitoring', '_blank', 'popup');
                        return;
                      }
                      const response = await fetch(
                        import.meta.env.VITE_SERVER_URL +
                          '/ciclopaseo/findById/' +
                          b.dataReserved.idCiclo
                      );
                      const body = await response.json();
                      sessionStorage.setItem('dataMap', JSON.stringify(body));
                      window.open('/monitoring', '_blank', 'popup');
                    } catch (e) {
                      alert('Error: su solicitud no se pudo procesar');
                    }
                  }}
                >
                  Monitoriar
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default IndexAdmin;
