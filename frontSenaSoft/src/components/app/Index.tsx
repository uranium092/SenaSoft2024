import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import BasicMenu from './nav/BasicMenu';

const Login: React.FC = () => {
  const goTo = useNavigate();
  return (
    <>
      <div
        className="text-center"
        style={{
          border: '1px solid blue',
          margin: '40px auto',
          padding: '60px 0',
          borderRadius: '15px',
          width: '40%',
        }}
      >
        <Typography variant="h3" className="text-center">
          Ciclas SENA
        </Typography>
        <BasicMenu />
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            goTo('/register');
          }}
        >
          Registro usuario
        </Button>
      </div>
      <img
        src="https://i.pinimg.com/originals/a7/ba/d1/a7bad1af3dc134bcee4a75412271c48d.gif"
        alt=""
        width="15%"
        height="150px"
        style={{ margin: 'auto', display: 'block' }}
      />
    </>
  );
};

export default Login;
