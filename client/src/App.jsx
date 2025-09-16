// client/src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout'; 
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <Routes>
      {/* Ruta Padre que usa el Layout */}
      <Route path="/" element={<Layout />}>
        {/* Rutas Hijas que se renderizarán dentro del Outlet */}
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;