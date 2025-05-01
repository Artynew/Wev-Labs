import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux"; // Доступ к Redux
import { useLoginState } from "../hooks/useLoginState"; // Проверка авторизации
import { useDispatch } from 'react-redux'; // Отправка actions
import { Link } from "react-router-dom"; // Навигация

function Header() {
    const username = useSelector((state) => state.username); // Имя пользователя
    const isAuthenticated = useLoginState(); // Статус авторизации
    const dispatch = useDispatch(); // Хук для dispatch

    return (
        <header className="bg-white text-dark py-2">
            <Container className="w-50 d-flex align-items-center">
                <h1 className="me-auto">Лабораторная 6</h1>
                {/* Отображение имени пользователя или кнопки входа */}
                <p className="m-0 me-2">
                    {isAuthenticated ? <Link to="/profile">Пользователь: {username}</Link> : null}
                </p>
                {/* Кнопка выхода */}
                {isAuthenticated ? (
                    <Link 
                        to="/" 
                        className="m-0 text-danger" 
                        onClick={() => dispatch({ type: 'LOGOUT' })} // Выход из системы
                    >
                        Выйти
                    </Link>
                ) : null}
            </Container>
        </header>
    )
}

export default Header;