import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addToCart } from '../../store/cartSlice';
import './styles/ProductDetails.scss';
import ProductGallery from './components/ProductGallery';
import RelatedProducts from './components/RelatedProducts';
import CartNotification from '../../components/CartNotification';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products } = useSelector((state: RootState) => state.products);
  const [product, setProduct] = useState(products.find(p => p.id === Number(id)));
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    if (!product) return;

    setIsAdding(true);
    dispatch(addToCart({ 
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    }));

    // Show success state briefly
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
      setShowNotification(true);
    }, 1000);
  };

  if (!product) return null;

  // Mock multiple images for the gallery
  const productImages = [
    product.image,
    // Add more images here
  ];

  return (
    <div className="product-details-page">
      <div className="product-details">
        <ProductGallery images={productImages} productName={product.name} />
        <div className="product-info">
          <h1>{product.name}</h1>
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
              <span className="rating-count">{product.reviews} reviews</span>
            </div>
            <div className="product-category">{product.category}</div>
          </div>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <p className="product-description">{product.description}</p>
          <div className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
            <i className="material-icons">
              {product.stock > 0 ? 'check_circle' : 'error'}
            </i>
            <span>
              {product.stock > 0 
                ? `${product.stock} in stock` 
                : 'Out of stock'}
            </span>
          </div>
          <div className="add-to-cart-section">
            <select 
              value={quantity} 
              onChange={handleQuantityChange}
              disabled={product.stock === 0}
              className="quantity-select"
            >
              {[...Array(Math.min(10, product.stock))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button 
              className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdding}
            >
              {isAdding ? (
                <>
                  <i className="material-icons">check</i>
                  Added to Cart
                </>
              ) : (
                <>
                  <i className="material-icons">shopping_cart</i>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <RelatedProducts 
        currentProductId={product.id} 
        category={product.category} 
      />
      <CartNotification 
        show={showNotification} 
        onClose={() => setShowNotification(false)} 
      />
    </div>
  );
};

export default ProductDetails; 