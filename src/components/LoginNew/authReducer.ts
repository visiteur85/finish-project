import {authAPI, LoginParamsType, ProfileType} from "../api";
import {setAppErrorAC, setAppIsInitializedAC, setAppStatusAC} from "../Initialized/app-reducer";
import {AppThunk} from "../../store/store";
import {handleServerAppError} from "../../utils/error-utils";
import {getProfileDataAC} from "../../store/profileReducer";
import {Dispatch} from "redux";


export type ProfileInitialStateType = {
    profile: ProfileType
    myId: string | null
    isLoggedIn: boolean
    registrationError: string | null
    isRegistration: boolean
}
const initialState: ProfileInitialStateType = {
    isLoggedIn: false,
    profile: {
        _id: null,
        email: null,
        name: null,
        avatar: null,
        publicCardPacksCount: null,
        created: null,
        updated: null,
        isAdmin: null,
        verified: null,
        rememberMe: null,
        error: null,
    },
    myId: null,
    registrationError: null,
    isRegistration: false
}

export const authReducer = (state: ProfileInitialStateType = initialState, action: AuthActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET_MY_ID':
            return {...state, myId: action.myId}
        case 'login/REGISTRATION-ERROR':
            return {...state, registrationError: action.error}
        case "login/SIGN-UP":
            return {...state, isRegistration: action.isRegistration}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIdProfileAC = (myId: string | null) => ({type: 'login/SET_MY_ID', myId} as const)
export const setServerErrorAC = (error: string | null) => ({type: 'login/REGISTRATION-ERROR', error} as const)
export const signUpAC = (isRegistration: boolean) => ({type: 'login/SIGN-UP', isRegistration} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(getProfileDataAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIdProfileAC(res.data._id))
        })
        .catch((e) => {
            handleServerAppError(e, dispatch)
        })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            handleServerAppError(e, dispatch)
        })
}
export const registerTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.register(data)
        .then(res => {
            dispatch(signUpAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            handleServerAppError(e, dispatch)
        })
}

// types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>
    | ReturnType<typeof setServerErrorAC>
    | ReturnType<typeof setIdProfileAC>
    | ReturnType<typeof signUpAC>

