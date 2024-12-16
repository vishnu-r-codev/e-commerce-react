import { Link } from 'react-router-dom';
import './SearchSuggestions.scss';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface SearchSuggestionsProps {
  suggestions: Product[];
  recentSearches: string[];
  onSelectSuggestion: (query: string) => void;
  onClearRecent: (query: string) => void;
  isLoading: boolean;
}

const SearchSuggestions = ({
  suggestions,
  recentSearches,
  onSelectSuggestion,
  onClearRecent,
  isLoading
}: SearchSuggestionsProps) => {
  if (isLoading) {
    return (
      <div className="search-suggestions">
        <div className="loading-suggestions">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="suggestion-skeleton">
              <div className="image-skeleton" />
              <div className="content-skeleton">
                <div className="title-skeleton" />
                <div className="meta-skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="search-suggestions">
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <div className="section-header">
            <h3>Recent Searches</h3>
            <button onClick={() => onClearRecent('')} className="clear-all">
              Clear All
            </button>
          </div>
          <div className="recent-list">
            {recentSearches.map((search, index) => (
              <div key={index} className="recent-item">
                <button onClick={() => onSelectSuggestion(search)}>
                  <i className="material-icons">history</i>
                  <span>{search}</span>
                </button>
                <button 
                  className="remove-recent"
                  onClick={() => onClearRecent(search)}
                >
                  <i className="material-icons">close</i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="product-suggestions">
          <h3>Products</h3>
          <div className="suggestions-list">
            {suggestions.map(product => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`}
                className="suggestion-item"
              >
                <img src={product.image} alt={product.name} />
                <div className="suggestion-content">
                  <h4>{product.name}</h4>
                  <div className="suggestion-meta">
                    <span className="category">{product.category}</span>
                    <span className="price">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!isLoading && suggestions.length === 0 && recentSearches.length === 0 && (
        <div className="no-suggestions">
          <p>No suggestions found</p>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions; 