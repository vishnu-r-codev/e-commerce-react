import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setFilters, clearFilters } from '../../../store/productSlice';
import './ProductFilters.scss';

const ProductFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.products);
  const categories = [
    'Electronics', 'Clothing', 'Books', 'Home & Kitchen',
    'Sports', 'Beauty', 'Toys', 'Jewelry'
  ];

  return (
    <div className="product-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        <button onClick={() => dispatch(clearFilters())}>Clear All</button>
      </div>

      <div className="filter-section">
        <h4>Categories</h4>
        <div className="categories-list">
          {categories.map(category => (
            <label key={category} className="category-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === category.toLowerCase()}
                onChange={() => dispatch(setFilters({ category: category.toLowerCase() }))}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) => dispatch(setFilters({ 
              priceRange: [Number(e.target.value), filters.priceRange[1]] 
            }))}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) => dispatch(setFilters({ 
              priceRange: [filters.priceRange[0], Number(e.target.value)] 
            }))}
          />
        </div>
      </div>

      <div className="filter-section">
        <h4>Rating</h4>
        <div className="rating-options">
          {[5, 4, 3, 2, 1].map(rating => (
            <label key={rating} className="rating-option">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => dispatch(setFilters({ rating }))}
              />
              <span className="stars">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="star filled">★</span>
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </span>
              <span>& Up</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters; 