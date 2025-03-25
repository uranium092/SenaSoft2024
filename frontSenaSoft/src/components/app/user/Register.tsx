import { Box, Container } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const Register: React.FC = () => {
  const [dataForm, setDataForm] = useState({ id: '', name: '', status: 1 });
  const goTo = useNavigate();

  return (
    <>
      <Box style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
        <Container
          style={{
            border: '1px solid blue',
            margin: 'auto 20px',
            width: '40%',
            borderRadius: '15px',
            padding: '10px 0',
            textAlign: 'center',
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetch(import.meta.env.VITE_SERVER_URL + '/user/newUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataForm),
              })
                .then(() => {
                  goTo('/');
                })
                .catch((err) => alert('Error: su solicitud no se pudo procesar'));
            }}
          >
            <h2>Registro</h2>
            <TextField
              id="filled-basic"
              label="Número Identidad"
              variant="filled"
              type="number"
              required
              name="id"
              onChange={(e) => {
                setDataForm({
                  ...dataForm,
                  [e.currentTarget.name]: e.currentTarget.value,
                });
              }}
            />
            <br /> <br />
            <TextField
              id="filled-basic"
              label="Nombre Completo"
              variant="filled"
              required
              name="name"
              onChange={(e) => {
                setDataForm({
                  ...dataForm,
                  [e.currentTarget.name]: e.currentTarget.value,
                });
              }}
            />{' '}
            <br />
            <br />
            <label style={{ fontSize: '1.1rem' }}>Seleccione su estrato</label>
            <br />
            <select
              name="status"
              onChange={(e) => {
                setDataForm({
                  ...dataForm,
                  [e.currentTarget.name]: e.currentTarget.value,
                });
              }}
              style={{ width: '30%' }}
            >
              <option value="1">Estrato 1</option>
              <option value="2">Estrato 2</option>
              <option value="3">Estrato 3</option>
              <option value="4">Estrato 4</option>
              <option value="5">Estrato 5</option>
              <option value="6">Estrato 6</option>
            </select>
            <br />
            <br />
            <Button type="submit" variant="outlined" className="w-50">
              Registrar
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
