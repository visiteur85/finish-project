import {NewPasswordType, passwordRecoveryAPI, SendMailType} from "../components/api/passwordApi";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AppThunk} from "./store";
import {handleServerAppError} from "../utils/error-utils";

const initialState = {
    recoverySuccess: '',
    successMessage: ''
}

export type InitialStateType = typeof initialState

export const forgotPasswordReducer = (state = initialState, action: ForgotPasswordActionsType): InitialStateType => {
    switch (action.type) {
        case 'PASSWORD/SET_SUCCESS':
            return {...state, recoverySuccess: action.recoverySuccess}
        case 'PASSWORD/SEND-NEW-PASSWORD':
            return {...state, successMessage: action.successMessage}
        default:
            return state
    }
};

// actions
export const setSuccessAC = (recoverySuccess: string) => ({type: 'PASSWORD/SET_SUCCESS', recoverySuccess} as const)
export const setNewPasswordAC = (successMessage: string) => ({type: 'PASSWORD/SEND-NEW-PASSWORD', successMessage} as const)

//thunks
export const sendEmailTC = (data: SendMailType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
     passwordRecoveryAPI.sendEmail(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setSuccessAC(res.data.info))
        })
        .catch(e => {
            handleServerAppError(e,dispatch)
        })
}
export const sendNewPasswordTC = (data: NewPasswordType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
     passwordRecoveryAPI.sendNewPassword(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setNewPasswordAC(res.data.info))
        })
        .catch(e => {
            handleServerAppError(e,dispatch)
        })
}


export type ForgotPasswordActionsType = ReturnType<typeof setSuccessAC> |  ReturnType<typeof setNewPasswordAC>
