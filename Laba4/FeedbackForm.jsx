// FeedbackForm.jsx
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const FeedbackForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [feedbacks, setFeedbacks] = useState([]);

  const onSubmit = (data) => {
    setFeedbacks(prev => [...prev, data]);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register('message')} placeholder="Ваш отзыв" />
        <button type="submit">Отправить</button>
      </form>

      <ul>
        {feedbacks.map((f, index) => (
          <li key={index}>{f.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackForm;
