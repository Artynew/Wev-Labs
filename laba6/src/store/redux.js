// Начальное состояние пользователя
const userState = {
    username: "",
    isLogin: false,
};

// Редьюсер для управления состоянием авторизации
export function userReducer(state = userState, action) {
    switch (action.type) {
        case "AUTH":
            return { ...state, isLogin: true, username: action.payload }; // Успешный вход
        case "LOGOUT":
            return { ...userState }; // Сброс состояния при выходе
        default:
            return { ...userState }; // Возврат начального состояния по умолчанию
    }
}

// Action Creator для авторизации
export const authUser = (userData) => ({
    type: "AUTH",
    payload: userData,
});