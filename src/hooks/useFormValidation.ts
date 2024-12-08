import { useState, useCallback } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  match?: string;
  custom?: (value: string) => boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = <T extends { [key: string]: string }>(
  initialState: T,
  validationRules: { [K in keyof T]?: ValidationRules }
) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback((name: keyof T, value: string) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value) {
      return 'This field is required';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Invalid email address';
    }

    if (rules.match && value !== formData[rules.match]) {
      return 'Values do not match';
    }

    if (rules.custom && !rules.custom(value)) {
      return 'Invalid value';
    }

    return '';
  }, [formData, validationRules]);

  const handleChange = useCallback((name: keyof T, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  const validateForm = useCallback(() => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof T, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    setFormData
  };
}; 