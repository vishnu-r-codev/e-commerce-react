import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <nav>
          <Link to="/" className="logo">E-Store</Link>
          <div className="nav-links">
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 E-Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout; 