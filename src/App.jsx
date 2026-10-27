// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CargoPage from './pages/CargoPage.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/presidente"
          element={<CargoPage slug="presidente" titulo="Presidente" />}
        />
        <Route
          path="/governador/rj"
          element={<CargoPage slug="governador" titulo="Governador RJ" />}
        />
        <Route
          path="/senador/rj"
          element={<CargoPage slug="senador" titulo="Senador RJ" />}
        />
        <Route
          path="/deputado-federal/rj"
          element={<CargoPage slug="deputado-federal" titulo="Deputado Federal RJ" />}
        />
        <Route
          path="/deputado-estadual/rj"
          element={<CargoPage slug="deputado-estadual" titulo="Deputado Estadual RJ" />}
        />
      </Routes>
    </Layout>
  );
}