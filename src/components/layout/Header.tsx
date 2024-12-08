import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './Header.scss';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="left-section">
          <Link to="/" className="logo">
            <i className="material-icons">shopping_bag</i>
            My Shop
          </Link>
          <div className="search-bar">
            <i className="material-icons">search</i>
            <input type="text" placeholder="Search products..." />
          </div>
        </div>

        <nav className="right-section">
          <Link to="/" className="nav-link">
            <i className="material-icons">home</i>
            Home
          </Link>
          <Link to="/products" className="nav-link">
            <i className="material-icons">inventory_2</i>
            Products
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <i className="material-icons">shopping_cart</i>
            Cart
            {items.length > 0 && (
              <span className="cart-badge">{items.length}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <Link to="/profile" className="nav-link profile-link">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="user-avatar" />
              ) : (
                <i className="material-icons">account_circle</i>
              )}
              Profile
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
              <i className="material-icons">login</i>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 