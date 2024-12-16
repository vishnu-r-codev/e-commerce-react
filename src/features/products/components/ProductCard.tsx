import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className="material-icons"
                >
                  {i < Math.floor(product.rating) ? 'star' : 
                   i < product.rating ? 'star_half' : 'star_border'}
                </i>
              ))}
            </div>
            <span className="rating-count">({product.reviews})</span>
          </div>
          <div className="product-price">${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 