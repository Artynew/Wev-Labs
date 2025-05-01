// components/AuthForm.js
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Некорректный email').required('Email обязателен'),
  password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязателен'),
});

const AuthForm = ({ login }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = useCallback((data) => {
    console.log('Авторизация:', data);
    login();
    localStorage.setItem('userEmail', data.email);
    navigate('/');
  }, [login, navigate]);

  return (
    <div className="form-container">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта? <a href="/register">Зарегистрироваться</a>
      </p>
    </div>
  );
};

export default AuthForm;
