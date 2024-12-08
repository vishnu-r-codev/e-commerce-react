import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import './Cart.scss';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <div className="placeholder-image">
                  <h3>{item.name}</h3>
                </div>
              </div>

              <div className="item-details">
                <h2>{item.name}</h2>
                <p className="item-description">{item.description}</p>

                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => dispatch(updateQuantity({ 
                        id: item.id, 
                        quantity: item.quantity - 1 
                      }))}
                    >-</button>
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => dispatch(updateQuantity({
                        id: item.id,
                        quantity: Number(e.target.value)
                      }))}
                    />
                    <button 
                      onClick={() => dispatch(updateQuantity({ 
                        id: item.id, 
                        quantity: item.quantity + 1 
                      }))}
                    >+</button>
                  </div>

                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button 
                    className="remove-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items ({itemCount})</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 