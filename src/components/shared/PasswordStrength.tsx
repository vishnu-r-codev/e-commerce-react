import React from 'react';
import './PasswordStrength.scss';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const calculateStrength = (password: string): number => {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    return strength;
  };

  const getStrengthLabel = (strength: number): string => {
    switch (strength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      case 5: return 'Very Strong';
      default: return '';
    }
  };

  const getStrengthColor = (strength: number): string => {
    switch (strength) {
      case 0: return '#ef4444';
      case 1: return '#f59e0b';
      case 2: return '#f59e0b';
      case 3: return '#22c55e';
      case 4: return '#22c55e';
      case 5: return '#15803d';
      default: return '#ddd';
    }
  };

  const strength = calculateStrength(password);
  const strengthLabel = getStrengthLabel(strength);
  const strengthColor = getStrengthColor(strength);

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`strength-bar ${index < strength ? 'active' : ''}`}
            style={{ backgroundColor: index < strength ? strengthColor : undefined }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color: strengthColor }}>
        {strengthLabel}
      </span>
      <ul className="strength-requirements">
        <li className={password.length >= 8 ? 'met' : ''}>
          At least 8 characters
        </li>
        <li className={/[a-z]/.test(password) ? 'met' : ''}>
          One lowercase letter
        </li>
        <li className={/[A-Z]/.test(password) ? 'met' : ''}>
          One uppercase letter
        </li>
        <li className={/[0-9]/.test(password) ? 'met' : ''}>
          One number
        </li>
        <li className={/[^a-zA-Z0-9]/.test(password) ? 'met' : ''}>
          One special character
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrength; 