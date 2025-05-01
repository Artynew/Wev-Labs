import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Profile from "../components/Profile";
import FeedbackList from "../components/FeedbackList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Маршрутизация
import { useLoginState } from "../hooks/useLoginState"; // Кастомный хук для проверки авторизации

function Content() {
    const isAuthenticated = useLoginState(); // Проверка, авторизован ли пользователь

    return (
        <>
            <Router>
                <Header /> {/* Шапка сайта */}
                <Routes>
                    {/* Маршруты: */}
                    <Route path='/' element={isAuthenticated ? <FeedbackList /> : <RegisterForm />} />
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
            </Router>
        </>
    )
}

export default Content;