// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Добро пожаловать!</h1>
      <p>Вы успешно авторизовались в системе.</p>
      <Link to="/feedback" className="btn">Перейти к обратной связи</Link>
    </div>
  );
};

export default Home;
