import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { ThemeContext } from '../../Context/ThemeContext';
import { Link } from "react-router-dom";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`text-center py-3 ${theme == "light" ? 'bg-white' : 'bg-dark'}`}>
      <Container>
        <Link to="/">Страница отзывов</Link>
      </Container>
    </footer>
  );
};

export default Footer;