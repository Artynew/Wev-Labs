import React from 'react';

const Navigation = ({ onNavigate }) => {
  return (
    <nav style={{ marginBottom: '20px' }}>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '10px' }}>
        <li><button onClick={() => onNavigate('home')}>Home</button></li>
        <li><button onClick={() => onNavigate('about')}>About</button></li>
      </ul>
    </nav>
  );
};

export default Navigation;