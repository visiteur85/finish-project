import {combineReducers, createStore} from "redux";
import {loginReducer} from "./loginReducer";
import {regReducer} from "./regReducer";
import {forgotPasReducer} from "./forgotPasReducer";
import {setPassReducer} from "./setPassReducer";
import {profileReducer} from "./profileReducer";

let rootReducer = combineReducers({
    login: loginReducer,
    registration: regReducer,
    forgotPas: forgotPasReducer,
    setPass: setPassReducer,
    profile: profileReducer
});

export type rootReducerType = ReturnType<typeof rootReducer>;
export let store = createStore(rootReducer)