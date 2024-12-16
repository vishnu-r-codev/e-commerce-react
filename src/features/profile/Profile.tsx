import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { updateProfile, logout } from '../../store/authSlice';
import './styles/Profile.scss';

interface Order {
  id: number;
  date: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
    // Fetch orders (mock data for now)
    setOrders([
      {
        id: 1,
        date: '2024-03-15',
        items: [
          { id: 1, name: 'Product 1', price: 99.99, quantity: 2 },
          { id: 2, name: 'Product 2', price: 49.99, quantity: 1 }
        ],
        total: 249.97,
        status: 'completed'
      },
      // Add more mock orders
    ]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData));
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Account</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        <div className="profile-tabs">
          <button
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <>
              <h2>Profile Information</h2>
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="button-group">
                    <button type="submit">Save Changes</button>
                    <button 
                      type="button" 
                      className="secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-row">
                    <span>Name:</span>
                    <span>{user?.name}</span>
                  </div>
                  <div className="info-row">
                    <span>Email:</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="info-row">
                    <span>Phone:</span>
                    <span>{user?.phone || 'Not provided'}</span>
                  </div>
                  <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
              )}
            </>
          )}

          {activeTab === 'orders' && (
            <div className="orders-section">
              <h2>Order History</h2>
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order #{order.id}</span>
                    <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div className="order-items">
                    {order.items.map(item => (
                      <div key={item.id} className="item">
                        <span className="item-name">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="order-total">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              <div className="settings-group">
                <h3>Security</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Password</h4>
                    <p>Change your account password</p>
                  </div>
                  <div className="setting-action">
                    <button>Change Password</button>
                  </div>
                </div>
              </div>
              <div className="settings-group">
                <h3>Preferences</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Email Notifications</h4>
                    <p>Manage your email preferences</p>
                  </div>
                  <div className="setting-action">
                    <button>Configure</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 