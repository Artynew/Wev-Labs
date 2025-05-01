import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Navbar fixed="bottom" bg="light" variant="light" className="py-1">
      <Container className="justify-content-center">
        <Nav>
          <Nav.Link as={Link} to="/feedback">
            <i className="bi bi-chat-left-text me-1"></i> Обратная связь
          </Nav.Link>
          <Nav.Link as={Link} to="/support" className="ms-3">
            <i className="bi bi-question-circle me-1"></i> Поддержка
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
