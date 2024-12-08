import './ProductCard.scss';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  rating: number;
  onClick: () => void;
}

const ProductCard = ({ id, name, price, rating, onClick }: ProductCardProps) => {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <div className="placeholder-image">
          <h3>{name}</h3>
        </div>
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
          ))}
        </div>
        <p className="price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard; 