import { useForm } from "react-hook-form";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function FeedbackForm({ feedbacks, feedbackAdd }) {
    const username = useSelector((state) => state.username);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = useCallback((data) => {
        const newFeedback = {
            ...data,
            author: username,
            id: feedbacks.length > 0 ? Math.max(...feedbacks.map(f => f.id)) + 1 : 1
        };

        axios.post("http://localhost:3000/feedbacks", newFeedback)
            .then(res => {
                feedbackAdd([...feedbacks, newFeedback]); // Используем newFeedback вместо res.data
                reset(); // Очищаем форму
                alert("Отзыв добавлен!");
            })
            .catch(err => {
                alert("Ошибка при добавлении отзыва");
            });
    }, [feedbackAdd, feedbacks, username, reset]);

    return (
        <Container className="mt-3 px-0 px-md-3">
            <div className="bg-light p-3 rounded">
                <h3 className="h4 mb-3">Оставьте отзыв!</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Текст отзыва</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            {...register("answer", { required: true })}
                            placeholder="Напишите ваш отзыв здесь..."
                            className={errors.answer ? "is-invalid" : ""}
                        />
                        {errors.answer && (
                            <Form.Control.Feedback type="invalid">
                                Это поле обязательно для заполнения
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant="primary" type="submit" size="lg">
                            Отправить отзыв
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default FeedbackForm;
