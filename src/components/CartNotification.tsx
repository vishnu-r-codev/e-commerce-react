import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartNotification.scss';

interface CartNotificationProps {
  show: boolean;
  onClose: () => void;
}

const CartNotification = ({ show, onClose }: CartNotificationProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="cart-notification">
      <div className="notification-content">
        <i className="material-icons success-icon">check_circle</i>
        <span>Item added to cart</span>
        <button onClick={() => navigate('/cart')} className="view-cart-btn">
          View Cart
        </button>
      </div>
    </div>
  );
};

export default CartNotification; 