import { Alert, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdm: React.FC = () => {
  const [id, setId] = useState<number | ''>('');
  const [noAuthAdmin, setNoAuthAdmin] = useState(true);
  const goTo = useNavigate();

  return (
    <>
      <Typography variant="h4" className="text-center mt-4">
        Ingresar Admin ciclas SENA
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
          if (!id) return;
          const responseStatus = await fetch(import.meta.env.VITE_SERVER_URL + `/admin/auth/${id}`);
          if (responseStatus.status !== 200) {
            setNoAuthAdmin(false);
            return;
          }
          goTo('/indexAdmin');
        }}
      >
        <TextField
          style={{ marginBottom: '20px' }}
          type="number"
          onChange={(e) => {
            setId(e.target.value ? parseInt(e.target.value, 10) : '');
          }}
          required
          id="outlined-basic"
          label="Número identificación"
          variant="outlined"
        />
        <br /> <br />
        <Button variant="outlined" type="submit">
          Ingresar
        </Button>
      </form>
      <div hidden={noAuthAdmin}>
        <Alert severity="error" style={{ width: '50%', margin: 'auto' }}>
          Credencial inválida
        </Alert>
      </div>
    </>
  );
};

export default LoginAdm;
