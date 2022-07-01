import {Dispatch} from "redux";
import {authAPI} from "../api";
import {setIsLoggedInAC} from "../LoginNew/authReducer";
import {AppThunk} from "../../store/store";
import {handleServerAppError} from "../../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
//status===loading - see
//status===| 'succeeded' | 'failed''idle' | no see

const initialState = {
    status: 'succeeded',
    error: null as null | string,
    isInitialized: false,
}
export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}

        default:
            return state
    }
}

export const initializeAppTC = ():AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            handleServerAppError(e,dispatch)
        })
        .finally(()=> {
            dispatch(setAppIsInitializedAC(true))
        })
}
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

export type AppActionType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>
