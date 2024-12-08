import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { login } from '../../store/authSlice';
import { useFormValidation } from '../../hooks/useFormValidation';
import FormInput from '../../components/shared/FormInput';
import './styles/Auth.scss';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    formData,
    errors,
    handleChange,
    validateForm
  } = useFormValidation(
    {
      email: '',
      password: ''
    },
    {
      email: {
        required: true,
        email: true,
        custom: (value) => value.length <= 100
      },
      password: {
        required: true,
        minLength: 6,
        maxLength: 50
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(login(formData)).unwrap();
      navigate('/profile');
    } catch {
      // Error is handled by the reducer
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="animate-form">
          <FormInput
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            required
            autoComplete="email"
          />

          <FormInput
            label="Password"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
            required
            autoComplete="current-password"
          />

          <button 
            type="submit" 
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <span className="loading-spinner">
                <i className="pi pi-spinner pi-spin"></i>
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 