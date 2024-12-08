import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, Product } from '../../services/mockData';
import './styles/ProductDetails.scss';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(Number(id));
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="product-details">
        <div className="product-container">
          <div className="not-found">
            <i className="material-icons">error_outline</i>
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="product-container">
        <div className="product-image">
          <div className="placeholder-image">
            <h2>{product.name}</h2>
          </div>
        </div>
        
        <div className="product-info">
          <h1>{product.name}</h1>
          
          <div className="rating-row">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < product.rating ? 'filled' : ''}`}>★</span>
              ))}
            </div>
            <span className="rating-value">{product.rating}</span>
          </div>

          <div className="price-row">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.inStock && <span className="stock-status">In Stock</span>}
          </div>

          <div className="quantity-row">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >−</button>
              <input 
                type="number" 
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              />
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(q => q + 1)}
              >+</button>
            </div>
          </div>

          <button 
            className="add-to-cart-btn"
            onClick={() => dispatch(addToCart({ product, quantity }))}
          >
            <i className="material-icons">shopping_cart</i>
            Add to Cart
          </button>

          <div className="tabs">
            <button className="tab active">Description</button>
            <button className="tab">Specifications</button>
            <button className="tab">Reviews</button>
          </div>

          <div className="tab-content">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 