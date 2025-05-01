import { Offcanvas, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SideMenu({ open, onClose }) {
  return (
    <Offcanvas show={open} onHide={onClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Меню</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup variant="flush">
          <ListGroup.Item action as={Link} to="/lab1" onClick={onClose}>
            Лабораторная 1
          </ListGroup.Item>
          <ListGroup.Item action as={Link} to="/lab2" onClick={onClose}>
            Лабораторная 2
          </ListGroup.Item>
          <ListGroup.Item action as={Link} to="/lab3" onClick={onClose}>
            Лабораторная 3
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
