import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './features/home/Home';
import ProductList from './features/products/ProductList';
import ProductDetails from './features/products/ProductDetails';
import Cart from './features/cart/Cart';
import Checkout from './features/checkout/Checkout';
import './styles/App.scss';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
