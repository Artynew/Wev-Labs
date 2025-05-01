import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header({ darkMode, toggleTheme, toggleMenu }) {
  const username = useSelector(state => state.username);

  return (
    <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"}>
      <Container>
        <Button variant="link" onClick={toggleMenu} className="me-2">
          <i className="bi bi-list"></i>
        </Button>
        <Navbar.Brand as={Link} to="/">Лабораторные работы</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/about">О себе</Nav.Link>
          {username && <Nav.Link as={Link} to="/profile">{username}</Nav.Link>}
        </Nav>
        <Form.Check 
          type="switch"
          id="theme-switch"
          label="Тёмная тема"
          checked={darkMode}
          onChange={toggleTheme}
        />
      </Container>
    </Navbar>
  );
}
