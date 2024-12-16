import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import ProductCard from './ProductCard';
import './RelatedProducts.scss';

interface RelatedProductsProps {
  currentProductId: number;
  category: string;
}

const RelatedProducts = ({ currentProductId, category }: RelatedProductsProps) => {
  const { items: products } = useSelector((state: RootState) => state.products);

  const relatedProducts = products
    .filter(product => 
      product.category === category && 
      product.id !== currentProductId
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="related-products">
      <h2>Related Products</h2>
      <div className="products-grid">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts; 