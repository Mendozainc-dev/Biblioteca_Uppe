import React from 'react';
import './UiStyles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', className = '', ...props 
}) => {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};