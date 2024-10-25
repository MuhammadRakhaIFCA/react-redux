const DEFAULT_STATE = {
    username: "",
    id: 0,
    role: ""
}

export const userReducer = (state = DEFAULT_STATE, action) => {
    if (action.type === "USER_LOGIN") {
        const dupState = { ...state }
        dupState.username = action.payload.username
        dupState.id = action.payload.id
        dupState.role = action.payload.role

        return dupState
    } else if (action.type === "USER_LOGOUT") {
        return DEFAULT_STATE
    }
    return state
}