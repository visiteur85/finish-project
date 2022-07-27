import {NewPasswordType, passwordRecoveryAPI, SendMailType} from "../components/api/passwordApi";
import {setAppStatusAC} from "./appReducer";
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
export const setNewPasswordAC = (successMessage: string) => ({type: 'PASSWORD/SEND-NEW-PASSWORD', successMessage
} as const)

//thunks
export const sendEmailTC = (data: SendMailType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let res = await passwordRecoveryAPI.sendEmail(data)
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setSuccessAC(res.data.info))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const sendNewPasswordTC = (data: NewPasswordType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let res = await passwordRecoveryAPI.sendNewPassword(data)
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setNewPasswordAC(res.data.info))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
// export const sendNewPasswordTC = (password?: string): AppThunk => (dispatch,getState) => {
//     dispatch(setAppStatusAC('loading'))
//
//     const token = getState().forgotPas.token;
//
//     passwordRecoveryAPI.sendNewPassword(token,password)
//         .then(res => {
//             dispatch(setAppStatusAC('succeeded'))
//             dispatch(setNewPasswordAC(res.data.info))
//         })
//         .catch(e => {
//             handleServerAppError(e,dispatch)
//         })
// }

export type ForgotPasswordActionsType = ReturnType<typeof setSuccessAC> | ReturnType<typeof setNewPasswordAC>
