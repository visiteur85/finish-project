import {AppActionType, setAppErrorAC, setAppStatusAC} from "../components/Initialized/app-reducer";
import {Dispatch} from "redux";
import {AuthActionsType, setServerErrorAC} from "../components/LoginNew/authReducer";

export const handleServerAppError = (e: any, dispatch: Dispatch<AuthActionsType>) => {
    const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
    dispatch(setAppErrorAC(error))
    dispatch(setAppStatusAC('failed'))
}
// export const handleServerNetworkError = (err:any,dispatch: Dispatch<AuthActionsType>) => {
//     const error = err.response
//         ? err.response.data.error
//         : (err.message + ', more details in the console');
//     dispatch(setServerErrorAC(error))
//     dispatch(setAppStatusAC('failed'))
// }
