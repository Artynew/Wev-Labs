import { useState, useEffect } from 'react';

const Home = () => {
  const [message, setMessage] = useState('Привет, мир!');

  useEffect(() => {
    console.log('Компонент смонтирован!');
    return () => {
      console.log('Компонент размонтирован!');
    };
  }, []);

  
};

export default Home;
