import React from 'react';
import './FormInput.scss';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  id,
  ...props
}) => {
  return (
    <div className="form-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={error ? 'error' : ''}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormInput; 