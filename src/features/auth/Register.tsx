
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { register } from '../../store/authSlice';
import './styles/Auth.scss';
import { useFormValidation } from '../../hooks/useFormValidation';
import FormInput from '../../components/shared/FormInput';

const Register = () => {
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
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    {
      name: {
        required: true,
        minLength: 2,
        maxLength: 50
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minLength: 6,
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
      },
      confirmPassword: {
        required: true,
        match: 'password'
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })).unwrap();
      navigate('/profile');
    } catch {
      // Error is handled by the reducer
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Full Name"
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            required
          />

          <FormInput
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            required
          />

          <FormInput
            label="Password"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
            required
          />

          <FormInput
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 