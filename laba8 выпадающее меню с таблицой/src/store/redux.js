const userState = {
    username: "",
    isLogin: false,

};

export function userReducer(state = userState, action) {
    console.log(state)
    switch (action.type) {
        case "AUTH":
            return { ...state, isLogin: true, username: action.payload, role: action.payload };
        case "LOGOUT":
            return {...userState};
        default:
            return { ...userState };
    }
}

export const authUser = (userData) => ({
    type: "AUTH",
    payload: userData,
});
