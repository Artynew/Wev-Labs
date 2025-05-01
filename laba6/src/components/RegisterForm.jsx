import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback((data) => {
    axios
      .post("http://localhost:3000/register", {
        username: data.username,
        password: data.password,
        email: data.email,
      })
      .then(() => {
        alert("Регистрация успешна!");
        navigate("/login"); // Перенаправление на страницу входа
      })
      .catch((err) => {
        alert("Ошибка регистрации: " + err.response?.data?.message || "Пользователь уже существует");
      });
  }, []);

  // Проверка совпадения паролей
  const password = watch("password");

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center mb-4">Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Логин */}
          <div className="form-group">
            <label>Логин</label>
            <input
              type="text"
              className="form-control"
              {...register("username", { required: "Обязательное поле" })}
            />
            {errors.username && (
              <small className="text-danger">{errors.username.message}</small>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", { 
                required: "Обязательное поле",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Некорректный email",
                },
              })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          {/* Пароль */}
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              className="form-control"
              {...register("password", { 
                required: "Обязательное поле",
                minLength: {
                  value: 6,
                  message: "Минимум 6 символов",
                },
              })}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {/* Подтверждение пароля */}
          <div className="form-group">
            <label>Подтвердите пароль</label>
            <input
              type="password"
              className="form-control"
              {...register("confirmPassword", {
                required: "Обязательное поле",
                validate: (value) =>
                  value === password || "Пароли не совпадают",
              })}
            />
            {errors.confirmPassword && (
              <small className="text-danger">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Зарегистрироваться
          </button>

          <p className="text-center mt-3">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
