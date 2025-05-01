import { Container, Spinner } from "react-bootstrap";

export const LoadingSpinner = ({ className = "mt-5" }) => (
  <Container className={`text-center ${className}`}>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Загрузка...</span>
    </Spinner>
  </Container>
);
