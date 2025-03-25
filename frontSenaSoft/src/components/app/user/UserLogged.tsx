import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AllBikes from './AllBikes';
import DataService from './DataService';

const UserLogged: React.FC = () => {
  const params = useParams();
  const [hasService, setHasService] = useState(false);
  const [dataService, setDataService] = useState('---');
  const [fatalError, setFatalError] = useState(false);
  useEffect(() => {
    const HasThisService = async () => {
      if (!sessionStorage.getItem('user')) {
        return alert('Sin Credenciales');
      }
      const urlServer = import.meta.env.VITE_SERVER_URL;
      if (!urlServer || !params.id) {
        return setFatalError(true);
      }
      const response = await fetch(urlServer + '/bike/servicesByUser/' + params.id);
      if (response.status !== 404 && response.status !== 200) {
        return setFatalError(true);
      }
      if (response.status == 404) return setHasService(false);
      setHasService(true);
      const body = await response.json();
      setDataService(JSON.stringify(body));
    };
    HasThisService();
  }, []);
  return (
    <>
      {fatalError ? (
        <h3>Error Inesperado. No se pudo procesar su solicitud</h3>
      ) : hasService ? (
        <DataService data={dataService} />
      ) : (
        <AllBikes />
      )}
    </>
  );
};

export default UserLogged;
