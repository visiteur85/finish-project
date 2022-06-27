import {authAPI, LoginParamsType, ProfileType} from "../api";
import {setAppErrorAC, setAppIsInitializedAC, setAppStatusAC} from "../Initialized/app-reducer";
import {AppThunk} from "../../store/store";
// import {setAppErrorAC, setAppIsInitializedAC, setAppStatusAC} from '../../app/app-reducer'
// import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
// import {clearTodosDataAC} from "../TodolistsList/todolists-reducer";


export type ProfileInitialStateType = {
    profile: ProfileType
    myId: string | null
    isLoggedIn: boolean
    // error: RequestErrorType
    // status: RequestStatusType
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
        error: null
    },
    myId: null,
}
type InitialStateType = typeof initialState

export const authReducer = (state: ProfileInitialStateType = initialState, action: AuthActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'PROFILE/SET_MY_ID': {
            return {
                ...state,
                myId: action.myId
            }
        }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setUserProfileAC = (profile: ProfileType) => ({type: 'PROFILE/SET_USER_PROFILE', profile} as const)
export const setIdProfileAC = (myId: string | null) => ({type: 'PROFILE/SET_MY_ID', myId} as const)
// thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
            // @ts-ignore
            dispatch(setUserProfileAC(res.data))
            dispatch(setIdProfileAC(res.data._id))
        })
        .catch((error) => {
            // handleServerNetworkError(dispatch,error )
        })
}
export const registerTC = (data: LoginParamsType):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.register(data)
        .then(res => {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
        })
        // .catch(err => {
        //     const error = err.response
        //         ? err.response.data.error
        //         : (err.message + ', more details in the console');
        //     dispatch(signUpServerErrorAC(error))
        //
        // })
        // .finally(() => {
        //     dispatch(signUpStatusAC('succeeded'))
        // })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
                // dispatch(clearTodosDataAC()) //clear asinc
        })
        .catch((error) => {
            // handleServerNetworkError(dispatch,error )
        })
}

// types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setIdProfileAC>
// | ReturnType<typeof clearTodosDataAC>