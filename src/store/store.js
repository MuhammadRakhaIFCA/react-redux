import { combineReducers, legacy_createStore } from "redux";
import { userReducer } from "./user";
import { counterReducer } from "./counter";
import { cartReducer } from "./cart";

export const reducer = combineReducers({
    user: userReducer,
    counter: counterReducer,
    cart: cartReducer
})

export const globalStore = legacy_createStore(reducer)