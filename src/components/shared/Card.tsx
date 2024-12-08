import React from 'react';
import './Card.scss';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  hoverable?: boolean;
  footer?: React.ReactNode;
  headerActions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  hoverable = false,
  footer,
  headerActions
}) => {
  return (
    <div className={`card ${hoverable ? 'hoverable' : ''} ${className}`}>
      {(title || subtitle || headerActions) && (
        <div className="card-header">
          <div className="card-titles">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {headerActions && (
            <div className="card-actions">
              {headerActions}
            </div>
          )}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 