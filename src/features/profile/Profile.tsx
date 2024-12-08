import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { logout } from '../../store/authSlice';
import './styles/Profile.scss';
import { CartItem } from '../../store/cartSlice';

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const orders = useSelector((state: RootState) => state.cart.items); // This would normally come from an orders slice

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-info">
          <div className="avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="user-details">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="profile-content">
        <section className="orders-section">
          <h2>Recent Orders</h2>
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order: CartItem) => (
                <div key={order.product.id} className="order-item">
                  <img src={order.product.image} alt={order.product.name} />
                  <div className="order-details">
                    <h3>{order.product.name}</h3>
                    <p className="quantity">Quantity: {order.quantity}</p>
                    <p className="price">${order.product.price * order.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-orders">No orders yet</p>
          )}
        </section>

        <section className="settings-section">
          <h2>Account Settings</h2>
          <div className="settings-list">
            <button className="settings-btn">
              Edit Profile
            </button>
            <button className="settings-btn">
              Change Password
            </button>
            <button className="settings-btn">
              Notification Preferences
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile; 