// src/components/Container.jsx
import React from 'react';

const Container = ({ children }) => {
  return (
    <div style={{ 
      padding: '40px', 
      border: '1px solid #ccc', 
      borderRadius: '5px', 
      margin: '10px',
      color: 'white' }}>
      {children}
    </div>
  );
};

export default Container;