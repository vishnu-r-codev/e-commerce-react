import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSearchQuery } from '../../store/searchSlice';
import './Header.scss';
import SearchSuggestions from '../search/SearchSuggestions';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const loadRecentSearches = () => {
      const recent = localStorage.getItem('recentSearches');
      if (recent) {
        setRecentSearches(JSON.parse(recent));
      }
    };

    loadRecentSearches();
  }, []);

  const handleSearchInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setShowSuggestions(true);

    if (value.trim().length >= 2) {
      setIsLoadingSuggestions(true);
      try {
        // Replace with your actual API call
        const response = await fetch(`/api/products/suggestions?q=${value}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error('Failed to fetch suggestions:', err);
      } finally {
        setIsLoadingSuggestions(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (query: string) => {
    setSearchInput(query);
    dispatch(setSearchQuery(query));
    setShowSuggestions(false);
    navigate('/products', { replace: true });

    // Save to recent searches
    const updatedRecent = [
      query,
      ...recentSearches.filter(item => item !== query)
    ].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
  };

  const handleClearRecent = (query: string) => {
    if (query) {
      const updated = recentSearches.filter(item => item !== query);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } else {
      setRecentSearches([]);
      localStorage.removeItem('recentSearches');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput.trim()));
      setShowSuggestions(false);
      navigate('/products', { replace: true });
    }
  };

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="logo">
          ShopName
        </Link>

        <div className="search-container" ref={searchRef}>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input">
              <i className="material-icons">search</i>
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={handleSearchInputChange}
                onFocus={() => setShowSuggestions(true)}
              />
              {searchInput && (
                <button 
                  type="button" 
                  className="clear-search"
                  onClick={() => {
                    setSearchInput('');
                    setSuggestions([]);
                  }}
                >
                  <i className="material-icons">close</i>
                </button>
              )}
            </div>
          </form>

          {showSuggestions && (
            <SearchSuggestions
              suggestions={suggestions}
              recentSearches={recentSearches}
              onSelectSuggestion={handleSelectSuggestion}
              onClearRecent={handleClearRecent}
              isLoading={isLoadingSuggestions}
            />
          )}
        </div>

        <nav className="nav-links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Home
          </Link>
          <Link to="/products" className={isActive('/products') ? 'active' : ''}>
            Products
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className={`cart-link ${isActive('/cart') ? 'active' : ''}`}>
            <i className="material-icons">shopping_cart</i>
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link to="/profile" className={`profile-link ${isActive('/profile') ? 'active' : ''}`}>
              <i className="material-icons">account_circle</i>
            </Link>
          ) : (
            <Link to="/login" className={`login-link ${isActive('/login') ? 'active' : ''}`}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 