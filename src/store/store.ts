import {forgotPasReducer} from "./forgotPasReducer";
import {setPassReducer} from "./setPassReducer";
import {ProfileActionType, profileReducer} from "./profileReducer";
import {TypedUseSelectorHook, useDispatch, useSelector,} from "react-redux";
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AuthActionsType, authReducer} from "./authReducer";
import {AppActionType, appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    auth: authReducer ,
    forgotPas: forgotPasReducer,
    setPass: setPassReducer,
    profile: profileReducer,
    app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type AppRootActionType= AuthActionsType | AppActionType | ProfileActionType

// export type AppRootStateType = ReturnType<typeof rootReducer>  old type
export type RootState = ReturnType<typeof store.getState>
// typing all dispatches
export type AppDispatch=ThunkDispatch<RootState,unknown,AppRootActionType>
// new typing for all Thunk, will be work just with useAppSelector!!!
export type AppThunk<ReturnType = void>=ThunkAction<ReturnType,RootState,unknown,AppRootActionType>


// custom hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch=()=>useDispatch<AppDispatch>()

// @ts-ignore
window.store = store;