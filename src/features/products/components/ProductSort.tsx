import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setFilters } from '../../../store/productSlice';
import './ProductSort.scss';

const ProductSort = () => {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state: RootState) => state.products.filters);

  const handleSort = (value: string) => {
    dispatch(setFilters({ sortBy: value }));
  };

  return (
    <div className="product-sort">
      <label>Sort by:</label>
      <select 
        value={sortBy || ''} 
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default ProductSort; 