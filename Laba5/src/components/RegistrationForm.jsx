// components/RegistrationForm.js
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string().required('Имя обязательно'),
  email: yup.string().email('Некорректный email').required('Email обязателен'),
  password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязателен'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Подтвердите пароль'),
});

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = useCallback((data) => {
    console.log('Регистрация:', data);
    // Здесь обычно отправка данных на сервер
    navigate('/login');
  }, [navigate]);

  return (
    <div className="form-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Имя</label>
          <input {...register('name')} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input {...register('email')} type="email" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        
        <div className="form-group">
          <label>Пароль</label>
          <input {...register('password')} type="password" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        
        <div className="form-group">
          <label>Подтвердите пароль</label>
          <input {...register('confirmPassword')} type="password" />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>
        
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>
        Уже есть аккаунт? <a href="/login">Войти</a>
      </p>
    </div>
  );
};

export default RegistrationForm;
