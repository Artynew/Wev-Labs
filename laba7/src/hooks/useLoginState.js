import { useSelector } from "react-redux";

// Кастомный хук для проверки авторизации
export const useLoginState = () => {
    const isAuthenticated = useSelector((state) => state.isLogin); // Получение состояния из Redux
    return isAuthenticated;
};