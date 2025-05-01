import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { authUser } from "../store/redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = useCallback((data) => {
        axios.post("http://localhost:3000/login", {
          username: data.username,
          password: data.password,
        })
        .then((res) => {
          dispatch(authUser(res.data.login)); // Сохраняем логин в Redux
          navigate("/");
        })
        .catch((err) => {
          alert(err.response?.data?.error || "Ошибка входа");
        });
      }, []);
      

    return (
        <div className="container">
            <div className="card">
                <h2 className="text-center mb-4">Вход</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Логин</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register("username", { required: true })}
                        />
                        {errors.username && <small className="text-danger">Обязательное поле</small>}
                    </div>

                    <div className="form-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <small className="text-danger">Обязательное поле</small>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Войти
                    </button>

                    <p className="text-center mt-3">
                        Нет аккаунта? <Link to="/">Зарегистрироваться</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
