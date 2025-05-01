import { useState, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, Button } from 'react-bootstrap';

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = useSelector((state) => state.username);
  const role = useSelector((state) => state.role);

  // Загрузка отзывов
  const loadFeedbacks = useCallback(() => {
    setIsLoading(true);
    axios.get("http://localhost:3000/feedbacks")
      .then((res) => {
        setFeedbacks(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Ошибка при загрузке отзывов:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadFeedbacks();
  }, [loadFeedbacks]);

  // Форма для отзывов
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // Обработчик отправки формы
  const onSubmit = useCallback((data) => {
    axios.post("http://localhost:3000/feedbacks", {
      author: username,
      answer: data.answer
    })
      .then(res => {
        // Обновляем список отзывов, добавив новый 
        // (важно: сервер должен вернуть новый отзыв в ответе)
        setFeedbacks(prev => [...prev, res.data]);
        reset();
      })
      .catch(err => {
        console.error("Ошибка при добавлении отзыва:", err);
        alert("Ошибка при добавлении отзыва");
      });
  }, [username, reset]);

  // Обработчик удаления отзыва
  const deleteItem = useCallback((id) => {
    axios.delete(`http://localhost:3000/feedbacks/${id}`)
      .then(() => {
        setFeedbacks(prev => prev.filter(f => f.id !== id));
      })
      .catch(err => {
        console.error("Ошибка при удалении отзыва:", err);
        alert("Ошибка при удалении отзыва");
      });
  }, []);

  if (isLoading) {
    return (
      <Container>
        <h2>Загрузка...</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
      {/* Форма для добавления отзыва */}
      <div className="bg-light p-3 rounded mb-4">
        <h3 className="h4 mb-3">Оставьте отзыв!</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Текст отзыва</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("answer", { required: "Это поле обязательно для заполнения" })}
              placeholder="Напишите ваш отзыв здесь..."
              isInvalid={!!errors.answer}
            />
            <Form.Control.Feedback type="invalid">
              {errors.answer?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
              Отправить отзыв
            </Button>
          </div>
        </Form>
      </div>

      {/* Список отзывов */}
      <div className="mb-4">
        <h2 className="mb-3">Отзывы:</h2>
        {feedbacks.length === 0 ? (
          <p>Пока нет отзывов. Будьте первым!</p>
        ) : (
          <div>
            {feedbacks.map((feedback) => (
              <div
                className="px-3 py-2 border rounded mb-2 d-flex align-items-center"
                key={feedback.id}
              >
                <div className="me-auto">
                  <div className="d-flex align-items-center mb-1">
                    <h5 className="mb-0 me-2">Автор: {feedback.author}</h5>
                    {feedback.mark && (
                      <span className="badge bg-secondary">Оценка: {feedback.mark}</span>
                    )}
                  </div>
                  <p className="mb-0">{feedback.answer}</p>
                </div>
                {role === "admin" && (
                  <button 
                    onClick={() => deleteItem(feedback.id)}
                    className="btn btn-link p-1"
                    title="Удалить отзыв"
                    disabled={isLoading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="red"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default FeedbackPage;
