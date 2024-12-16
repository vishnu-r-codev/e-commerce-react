import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setFilters, clearFilters } from '../../../store/productSlice';
import './ProductFilters.scss';

const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Sports",
  "Books",
  "Beauty",
  "Toys",
  "Automotive",
  "Health",
  "Garden"
];

const priceRanges = [
  { label: 'Under $25', range: [0, 25] },
  { label: '$25 to $50', range: [25, 50] },
  { label: '$50 to $100', range: [50, 100] },
  { label: '$100 to $200', range: [100, 200] },
  { label: 'Over $200', range: [200, Infinity] }
];

const ratings = [5, 4, 3, 2, 1];

const ProductFilters = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.products);

  const handleCategoryClick = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    
    dispatch(setFilters({ category: newCategories }));
  };

  const handlePriceChange = (range: [number, number]) => {
    dispatch(setFilters({ priceRange: range }));
  };

  const handleRatingChange = (rating: number) => {
    dispatch(setFilters({ rating }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="product-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        {(filters.category.length > 0 || filters.priceRange || filters.rating) && (
          <button onClick={handleClearFilters} className="clear-filters">
            Clear All
          </button>
        )}
      </div>

      <div className="filter-section">
        <h4>Categories</h4>
        <div className="categories-grid">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${filters.category.includes(category) ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-ranges">
          {priceRanges.map(({ label, range }) => (
            <label key={label} className="price-range-item">
              <input
                type="radio"
                name="priceRange"
                checked={JSON.stringify(filters.priceRange) === JSON.stringify(range)}
                onChange={() => handlePriceChange(range)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Rating</h4>
        <div className="ratings-list">
          {ratings.map(rating => (
            <label key={rating} className="rating-item">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
              />
              <div className="stars">
                {[...Array(rating)].map((_, i) => (
                  <i key={i} className="material-icons">star</i>
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <i key={i} className="material-icons">star_border</i>
                ))}
              </div>
              <span>& Up</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters; 