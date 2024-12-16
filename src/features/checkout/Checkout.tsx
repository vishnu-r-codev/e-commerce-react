import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import './Checkout.scss';
import paypalIcon from '../../assets/icons/payment/paypal.svg';
import applePayIcon from '../../assets/icons/payment/apple-pay.svg';
import googlePayIcon from '../../assets/icons/payment/google-pay.svg';

const Checkout = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, [items, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order placed:', {
      items,
      shipping: formData,
      payment: paymentMethod,
      total: total + tax
    });
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10; // Fixed shipping cost
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="checkout-page">
        <div className="loading">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="shipping-section">
          <h2>Shipping Information</h2>
          <form className="shipping-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="form-field">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                  required
                />
              </div>

              <div className="form-field">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Enter ZIP code"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </div>
          </form>

          <PaymentMethodSection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        </div>

        <div className="order-summary">
          <div className="summary-header">
            <h2>Order Summary</h2>
            <span className="item-count">{items.length} items</span>
          </div>

          <div className="summary-items">
            {items.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                  <span className="item-quantity">{item.quantity}</span>
                </div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <div className="item-price">
                    <span className="unit-price">${item.price.toFixed(2)} × {item.quantity}</span>
                    <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="place-order-btn">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentMethodSection = ({ paymentMethod, setPaymentMethod }: {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}) => {
  return (
    <div className="payment-section">
      <h2>Payment Method</h2>
      <div className="payment-options">
        <button 
          type="button"
          className={`payment-option ${paymentMethod === 'credit' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('credit')}
        >
          <div className="payment-icon">
            <i className="material-icons">credit_card</i>
          </div>
          <span>Credit/Debit Card</span>
        </button>

        <button 
          type="button"
          className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('paypal')}
        >
          <div className="payment-icon">
            <img src={paypalIcon} alt="PayPal" />
          </div>
          <span>PayPal</span>
        </button>

        <button 
          type="button"
          className={`payment-option ${paymentMethod === 'apple' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('apple')}
        >
          <div className="payment-icon">
            <img src={applePayIcon} alt="Apple Pay" />
          </div>
          <span>Apple Pay</span>
        </button>

        <button 
          type="button"
          className={`payment-option ${paymentMethod === 'google' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('google')}
        >
          <div className="payment-icon">
            <img src={googlePayIcon} alt="Google Pay" />
          </div>
          <span>Google Pay</span>
        </button>
      </div>

      {paymentMethod === 'credit' && (
        <div className="credit-card-form">
          <div className="form-field">
            <label>Card Number</label>
            <div className="card-input-wrapper">
              <input 
                type="text" 
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                pattern="\d*"
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  value = value.replace(/(\d{4})/g, '$1 ').trim();
                  e.target.value = value;
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field expiry">
              <label>Expiry Date</label>
              <input 
                type="text" 
                placeholder="MM/YY"
                maxLength={5}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2);
                  }
                  e.target.value = value;
                }}
              />
            </div>

            <div className="form-field cvv">
              <label>
                CVV
                <i className="material-icons help-icon" title="3-4 digits on the back of your card">help_outline</i>
              </label>
              <input 
                type="password" 
                placeholder="123"
                maxLength={4}
                pattern="\d*"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout; 