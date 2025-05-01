// Начальное состояние
const initialState = {
    counter: 0,
};

// Редьюсер — чистая функция, которая обновляет состояние
export function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, counter: state.counter + 1 };
        case 'DECREMENT':
            return { ...state, counter: state.counter - 1 };
        default:
            return state;
    }
}