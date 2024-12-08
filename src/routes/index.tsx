import { Routes, Route } from 'react-router-dom';
import Home from '../features/home/Home';
import ProductList from '../features/products/ProductList';
import ProductDetails from '../features/products/ProductDetails';
import Cart from '../features/cart/Cart';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Profile from '../features/profile/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes; 