import { useState, useEffect } from 'react';

const Home = () => {
  const [message, setMessage] = useState('Привет, мир!');

  return (
    <div>
      <h2>Главная</h2>
      <p>{message}</p>
      <button onClick={() => setMessage('Ты нажал кнопку!')}>Нажми меня</button>
    </div>
  );
};
export default Home;