// src/pages/Home.jsx
import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';

const Home = () => {
  const handleClick = () => {
    alert('Hello World!');
  };

  return (
    <Container>
      <h1>Hello World</h1>
      <Button onClick={handleClick}>Нажать</Button>
    </Container>
  );
};

export default Home;