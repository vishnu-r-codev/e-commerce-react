import React from 'react';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  icon?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`custom-button ${variant} ${fullWidth ? 'full-width' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="loading-spinner">
          <i className="pi pi-spinner pi-spin"></i>
        </span>
      ) : (
        <>
          {icon && <i className={`pi ${icon}`}></i>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button; 