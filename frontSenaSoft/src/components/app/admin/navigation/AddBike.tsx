import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddBike: React.FC = () => {
  const [dataForm, setDataForm] = useState({ brand: '', price: 0, color: '', image: '' });
  const goTo = useNavigate();
  const handleChange = (e: any) => {
    setDataForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(import.meta.env.VITE_SERVER_URL + '/bike/newBike', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataForm),
      });
    } catch (e) {
      alert('Error: su solicitud no se pudo procesar');
    } finally {
      goTo('/indexAdmin');
    }
  };
  return (
    <>
      <Typography variant="h4" align="center" className="my-3">
        Agregar Bicicleta
      </Typography>
      <form
        style={{
          borderRadius: 15,
          border: '1px solid blue',
          padding: 30,
          width: '50%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
        onSubmit={handleSubmit}
      >
        <TextField id="brand" label="Marca" variant="outlined" required onChange={handleChange} />
        <TextField
          id="price"
          label="Precio/Km"
          variant="outlined"
          type="number"
          required
          onChange={handleChange}
        />
        <TextField id="color" label="Color" variant="outlined" required onChange={handleChange} />
        <TextField
          id="image"
          label="Url imagen"
          variant="outlined"
          required
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Crear
        </Button>
      </form>
    </>
  );
};

export default AddBike;
