import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import ProductCard from '../../products/components/ProductCard';
import './FeaturedProducts.scss';

const FeaturedProducts = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const featuredProducts = products.slice(0, 4); // Get first 4 products

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {featuredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts; 