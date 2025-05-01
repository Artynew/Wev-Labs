// src/Button.jsx
import React from 'react';

const Button = ({ onClick, children, disabled = false, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      data-testid="button"
    >
      {children}
    </button>
  );
};

export default Button;
