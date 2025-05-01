import { Container, Card } from 'react-bootstrap';

export default function AboutPage() {
  return (
    <Container className="mt-4 mb-5">
      <Card>
        <Card.Body>
          <Card.Title>О себе</Card.Title>
          <Card.Text>
            Страничка О себе где можно рассказать информацию о сайте.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
