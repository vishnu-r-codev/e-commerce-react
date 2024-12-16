import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../../store';
import { loginStart, loginSuccess, loginFailure, clearError } from '../../store/authSlice';
import { authService } from '../../services/mockAuthService';
import './styles/Auth.scss';

interface ValidationErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
    
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [dispatch, isAuthenticated, navigate]);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch(loginStart());

    try {
      const response = await authService.login(formData);
      dispatch(loginSuccess(response));
      navigate('/profile');
    } catch (err) {
      dispatch(loginFailure(err instanceof Error ? err.message : 'Login failed'));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={validationErrors.email ? 'error' : ''}
              required
            />
            {validationErrors.email && (
              <span className="error-text">{validationErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={validationErrors.password ? 'error' : ''}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className="material-icons">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </i>
              </button>
            </div>
            {validationErrors.password && (
              <span className="error-text">{validationErrors.password}</span>
            )}
          </div>

          <div className="test-credentials">
            <p>Test Credentials:</p>
            <code>
              Email: test@example.com<br />
              Password: password123
            </code>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="auth-links">
            <p className="auth-link">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 