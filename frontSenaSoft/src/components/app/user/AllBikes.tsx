import React, { useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  Box,
  ChakraProvider,
} from '@chakra-ui/react';
import { Dialog, DialogTitle, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Bike {
  id: number;
  image: string;
  brand: string;
  status: boolean;
  price: number;
  dataReserved: { type: string; idCiclo: number };
}

interface BikeDialog {
  open: boolean;
  dataBike: { image?: string; brand?: string; color?: string; status?: boolean; price?: number };
}

const AllBikes: React.FC = () => {
  const goTo = useNavigate();
  const [bikes, setBikes] = useState<Bike[]>([]);

  const getDataForDialog = useCallback(
    (clickId: number) => bikes.find((b) => b.id == clickId),
    [bikes]
  );

  useEffect(() => {
    const getBikes = async () => {
      try {
        if (!sessionStorage.getItem('user')) {
          return alert('Sin Credenciales');
        }
        const response = await fetch(import.meta.env.VITE_SERVER_URL + '/bike/allBikes');
        const bodyResponse = await response.json();
        setBikes(bodyResponse);
      } catch (e) {
        setBikes([]);
        alert('Error: su solicitud no se pudo procesar');
      }
    };
    getBikes();
  }, []);
  const [bikeDialog, setBikeDialog] = useState<BikeDialog>({ open: false, dataBike: {} });

  return (
    <>
      <Typography variant="h4" className="text-center mt-3">
        Navegar en bicicletas:{' '}
      </Typography>
      <hr style={{ width: '80%', margin: 'auto' }} className="my-4"></hr>
      <Dialog
        open={bikeDialog.open}
        onClose={() => {
          setBikeDialog({ open: false, dataBike: {} });
        }}
      >
        <DialogTitle>
          <img src={bikeDialog?.dataBike?.image || ''} alt="" />
        </DialogTitle>
        <Typography variant="h6" className="text-center">
          Marca: {bikeDialog?.dataBike?.brand || '...'}
        </Typography>
        <Typography variant="h6" className="text-center">
          Color: {bikeDialog?.dataBike?.color || '...'}
        </Typography>
        <Typography variant="h6" className="text-center">
          Estado: {bikeDialog?.dataBike?.status ? 'Disponible' : 'No Disponible'}
        </Typography>
        <Typography variant="h6" className="text-center">
          Precio por Km: {(bikeDialog?.dataBike?.price || '0') + '$'}
        </Typography>
      </Dialog>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'center',
        }}
      >
        {bikes.map((b) => (
          <>
            <ChakraProvider key={b.id}>
              <Card maxW="300px">
                <CardBody>
                  <Image
                    style={{ height: '150px', margin: 'auto' }}
                    src={b.image}
                    borderRadius="lg"
                    onClick={() => {
                      setBikeDialog({
                        open: true,
                        dataBike: getDataForDialog(b.id) || {},
                      });
                    }}
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{b.brand}</Heading>
                    {b.status ? (
                      <Text style={{ color: 'red' }}>No Disponible</Text>
                    ) : (
                      <Text style={{ color: 'green', fontWeight: 'bolder' }}>Disponible</Text>
                    )}
                    <Text color="blue.600" fontSize="2xl">
                      ${b.price}/km
                    </Text>
                  </Stack>
                </CardBody>

                {!b.status && (
                  <>
                    <Divider />
                    <CardFooter>
                      <Box padding="4">
                        <Button
                          variant="outline"
                          colorScheme="blue"
                          width="100%"
                          mb="2"
                          onClick={() => {
                            goTo('/bikeFree/' + b.id);
                          }}
                        >
                          Alquilar libre
                        </Button>
                        <Button
                          variant="outline"
                          colorScheme="blue"
                          width="100%"
                          onClick={() => {
                            goTo('/ciclopaseos/' + b.id);
                          }}
                        >
                          Alquilar para ciclopaseos
                        </Button>
                      </Box>
                    </CardFooter>
                  </>
                )}
              </Card>
            </ChakraProvider>
          </>
        ))}
      </div>
    </>
  );
};

export default AllBikes;
