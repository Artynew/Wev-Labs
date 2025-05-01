import { useState, useEffect } from "react";
import FeedbackForm from "./FeedBackForm";
import axios from "axios";
import { Container, Card, ListGroup, Button } from 'react-bootstrap';

function FeedbackList() {
    const [feedbacks, setFeedback] = useState([]);

    useEffect(() => {
        loadFeedbacks();
    }, []);

    const loadFeedbacks = () => {
        axios.get("http://localhost:3000/feedbacks")
            .then(res => setFeedback(res.data));
    };

    const deleteItem = (id) => {
        axios.delete(`http://localhost:3000/feedbacks/${id}`)
            .then(() => {
                loadFeedbacks(); // Перезагружаем отзывы после удаления
            });
    };

    return (
        <Container className="mt-3">
            <h2 className="h3 mb-3">Отзывы</h2>
            
            <Card className="mb-4">
                <ListGroup variant="flush">
                    {feedbacks.map((el) => (
                        <ListGroup.Item key={el.id}>
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 className="h6 mb-1">{el.author || "Анонимный пользователь"}</h5>
                                    <p className="mb-1">{el.answer || "Нет текста отзыва"}</p>
                                </div>
                                <Button 
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => deleteItem(el.id)}
                                >
                                    Удалить
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>

            <FeedbackForm feedbackAdd={setFeedback} feedbacks={feedbacks} />
        </Container>
    );
}

export default FeedbackList;
