import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/app/Index';
import Register from './components/app/user/Register';
import Map from './components/app/nav/Mapa';
import UserLogged from './components/app/user/UserLogged';
import LoginUser from './components/app/user/Login';
import WayFree from './components/app/user/WayFree';
import IndexAdmin from './components/app/admin/navigation/IndexAdmin';
import LoginAdm from './components/app/admin/sessions/LoginAdm';
import Ciclopaseos from './components/app/admin/navigation/Ciclopaseos';
import AddCiclopaseo from './components/app/admin/navigation/AddCiclopaseo';
import CiclopaseosUser from './components/app/user/CiclopaseosUser';
import MapCiclopaseo from './components/app/user/MapCiclopaseo';
import MonitoringMap from './components/app/admin/navigation/MonitoringMap';
import ChartBikes from './components/app/admin/navigation/ChartsBikes';
import AddBike from './components/app/admin/navigation/AddBike';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginUser" element={<LoginUser />} />
        <Route path="/user/:id" element={<UserLogged />} />
        <Route path="/map" element={<Map />} />
        <Route path="/bikeFree/:id" element={<WayFree />} />
        <Route path="/indexAdmin" element={<IndexAdmin />} />
        <Route path="/loginAdm" element={<LoginAdm />} />
        <Route path="/admin/ciclopaseos" element={<Ciclopaseos />} />
        <Route path="/admin/nuevoCicloPaseo" element={<AddCiclopaseo />} />
        <Route path="/admin/aggBicicleta" element={<AddBike />} />
        <Route path="/ciclopaseos/:idBike" element={<CiclopaseosUser />} />
        <Route path="/mapa" element={<MapCiclopaseo />} />
        <Route path="/monitoring" element={<MonitoringMap />} />
        <Route path="/admin/reportes" element={<ChartBikes />} />
      </Routes>
    </Router>
  );
}

export default App;
