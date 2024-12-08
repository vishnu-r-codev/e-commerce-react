import { Product } from '../../../types';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i}
              className={`star ${i < product.rating ? 'filled' : ''}`}
            >
              ★
            </span>
          ))}
          <span className="count">({product.reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 