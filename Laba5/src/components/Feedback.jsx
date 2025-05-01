// components/Feedback.js
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  message: yup.string().required('Сообщение обязательно').min(5, 'Минимум 5 символов'),
});

const Feedback = () => {
  // Создаем состояние для хранения отзывов
  const [feedbacks, setFeedbacks] = useState([]);
  // Извлекаем данные из localStorage при инициализации
  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setFeedbacks(storedFeedbacks);
  }, []);

  // Используем useForm для управления формой
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Функция для обработки отправки формы
  const onSubmit = useCallback((data) => {
    const newFeedback = {
      ...data,
      id: Date.now(),
      date: new Date().toLocaleString(),
      author: localStorage.getItem('userEmail') || 'Аноним',
    };

    // Обновляем состояние отзывов и сохраняем в localStorage
    setFeedbacks(prev => {
      const updatedFeedbacks = [newFeedback, ...prev];
      localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
      return updatedFeedbacks;
    });
    reset();
  }, [reset]);

  return (
    <div className="feedback-container">
      <h2>Обратная связь</h2>

      <div className="feedback-form">
        <h3>Оставить отзыв</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Сообщение</label>
            <textarea {...register('message')} rows="4"></textarea>
            {errors.message && <p className="error">{errors.message.message}</p>}
          </div>

          <button type="submit">Отправить</button>
        </form>
      </div>

      <div className="feedback-list">
        <h3>Отзывы</h3>
        {feedbacks.length === 0 ? (
          <p>Пока нет отзывов</p>
        ) : (
          <ul>
            {feedbacks.map(feedback => (
              <li key={feedback.id} className="feedback-item">
                <div className="feedback-header">
                  <span className="author">{feedback.author}</span>
                  <span className="date">{feedback.date}</span>
                </div>
                <p className="message">{feedback.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feedback;
