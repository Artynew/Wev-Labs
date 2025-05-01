// components/Profile.js
import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ logout }) => {
  const userEmail = localStorage.getItem('userEmail') || 'Пользователь';

  return (
    <div className="profile">
      <div className="dropdown">
        <button className="dropbtn">
          {userEmail} <span className="arrow">▼</span>
        </button>
        <div className="dropdown-content">
          <Link to="/">Главная</Link>
          <Link to="/feedback">Обратная связь</Link>
          <button onClick={logout}>Выйти</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
