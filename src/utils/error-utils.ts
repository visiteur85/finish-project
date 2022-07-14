import {setAppErrorAC, setAppStatusAC} from "../store/app-reducer";
import {Dispatch} from "redux";
import {AuthActionsType} from "../store/authReducer";
import axios, {AxiosError} from "axios";

export const handleServerAppError = (error: Error | AxiosError, dispatch: Dispatch<AuthActionsType>) => {
    const errorMessage = axios.isAxiosError(error)
        ? (error.response?.data as {error:string}).error
        : (error.message + ', more details in the console');
    dispatch(setAppErrorAC(errorMessage))
    dispatch(setAppStatusAC('failed'))
}
// error.response?.data.error
// export const handleServerNetworkError = (err:any,dispatch: Dispatch<AuthActionsType>) => {
//     const error = err.response
//         ? err.response.data.error
//         : (err.message + ', more details in the console');
//     dispatch(setServerErrorAC(error))
//     dispatch(setAppStatusAC('failed'))
// }
