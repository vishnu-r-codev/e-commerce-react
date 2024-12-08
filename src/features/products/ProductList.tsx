import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../../store';
import { setFilters } from '../../store/productSlice';
import ProductCard from '../home/components/ProductCard';
import ProductFilters from './components/ProductFilters';
import ProductSort from './components/ProductSort';
import { Product } from '../../services/mockData';
import './styles/ProductList.scss';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { products, filters } = useSelector((state: RootState) => state.products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      dispatch(setFilters({ category }));
    }
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  }, [searchParams, dispatch]);

  const filteredProducts = products.filter((product: Product) => {
    if (filters.category && product.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    if (filters.rating && product.rating < filters.rating) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a: Product, b: Product) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>{filters.category || 'All Products'}</h1>
        <div className="products-meta">
          <span>{sortedProducts.length} products found</span>
          <ProductSort />
        </div>
      </div>

      <div className="products-layout">
        <aside className="filters-sidebar">
          <ProductFilters />
        </aside>

        <main className="products-content">
          {isLoading ? (
            <div className="products-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="product-card-skeleton">
                  <div className="image-skeleton" />
                  <div className="content-skeleton">
                    <div className="title-skeleton" />
                    <div className="rating-skeleton" />
                    <div className="price-skeleton" />
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="products-grid">
              {sortedProducts.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  onClick={() => navigate(`/products/${product.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <i className="material-icons">search_off</i>
              <h2>No products found</h2>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList; 