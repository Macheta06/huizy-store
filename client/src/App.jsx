// client/src/App.jsx

import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminRoute from "./components/AdminRoute";
import AdminProductListPage from "./pages/AdminProductListPage";
import ProductEditPage from "./pages/ProductEditPages";
import ShopPage from "./pages/ShopPage";
import AboutUsPage from "./pages/AboutUsPage";
import RecoleccionPage from "./pages/RecoleccionPage";
import RecoleccionFormPage from "./pages/RecoleccionFormPage";

function App() {
  return (
    <Routes>
      {/* Rutas Públicas con Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="my-orders" element={<MyOrdersPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="conocenos" element={<AboutUsPage />} />
        <Route path="recoleccion" element={<RecoleccionPage />} />
        <Route path="agendar-recoleccion" element={<RecoleccionFormPage />} />
      </Route>

      {/* Rutas de Administrador Protegidas */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="productlist" element={<AdminProductListPage />} />
        <Route path="product/:id/edit" element={<ProductEditPage />} />
        <Route path="product/new" element={<ProductEditPage />} />
      </Route>
    </Routes>
  );
}

export default App;
