import { Container, Card, ListGroup } from 'react-bootstrap';

export default function SupportPage() {
  return (
    <Container className="mt-4 mb-5">
      <Card>
        <Card.Body>
          <Card.Title>Поддержка</Card.Title>
          <Card.Text>
            Если у вас возникли вопросы, свяжитесь с нами:
          </Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <i className="bi bi-envelope me-2"></i> support@example.com
            </ListGroup.Item>
            <ListGroup.Item>
              <i className="bi bi-telephone me-2"></i> +7 (123) 456-78-90
            </ListGroup.Item>
            <ListGroup.Item>
              <i className="bi bi-clock me-2"></i> Пн-Пт: 9:00 - 18:00
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}
