import { TextField, Button, Alert, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginUser: React.FC = () => {
  const [id, setId] = useState();
  const [noAuth, setNoAuth] = useState(true);
  const goTo = useNavigate();
  return (
    <>
      <Typography variant="h4" className="text-center mt-4">
        Ingresar a Ciclas SENA
      </Typography>
      <form
        style={{
          border: '1px solid blue',
          width: '30%',
          margin: '40px auto',
          padding: '30px 0',
          textAlign: 'center',
          borderRadius: '15px',
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch(import.meta.env.VITE_SERVER_URL + '/user/auth/' + id);
          if (response.status == 404) {
            return setNoAuth(false);
          }
          const bodyResponse = await response.json();
          sessionStorage.setItem('user', JSON.stringify(bodyResponse));
          goTo('/user/' + id);
        }}
      >
        <TextField
          style={{ marginBottom: '20px' }}
          type="number"
          onChange={(e: any) => {
            setId(e.target.value);
          }}
          required
          id="outlined-basic"
          label="Número Identificación"
          variant="outlined"
        />
        <br></br>
        <Button variant="outlined" type="submit">
          Ingresar
        </Button>{' '}
        <br />
        <Link to="/register">Registro</Link>
      </form>
      <div hidden={noAuth}>
        <Alert severity="error" style={{ width: '50%', margin: 'auto' }}>
          Usuario inexistente. ¿Ya te <Link to="/register">registraste</Link>?
        </Alert>
      </div>
    </>
  );
};

export default LoginUser;
