import {authAPI, LoginParamsType, ParamsType} from "../components/api";
import {AppThunk} from "./store";
import {setAppStatusAC} from "../components/Initialized/app-reducer";
import {setIsLoggedInAC} from "../components/LoginNew/authReducer";
import {profileApi} from "../components/ApiProfile";
import {Dispatch} from "redux";



const initialState: ParamsType  = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: null,
    updated: null,
    isAdmin: true,
    verified: true,
    rememberMe: true,
    error: "string | null",
};

export const profileReducer = (state = initialState, action: ProfileActionType) => {
    switch (action.type) {
        case "profile/GET-PROFILE": {
            // return action.ProfileData
            return {...state, ...action.ProfileData}
        }
        case "profile/CHANGE-NAME": {
            debugger
            return {...state, name:action.newName}
        }
        default: return state
    }
};
//types for AC
export type ProfileActionType = getProfileDataType | ChangeNameType
//AC with types
//загружаем данные пользователя
export type getProfileDataType = ReturnType<typeof getProfileDataAC>
export const getProfileDataAC = (ProfileData: ParamsType) => ({type: "profile/GET-PROFILE", ProfileData} as const);

//изменение имени пользователя
export type ChangeNameType = ReturnType<typeof changeNameAC>
export const changeNameAC = (newName: string) => ({type: "profile/CHANGE-NAME", newName} as const);


//thunks
export const changeNameTC = (newName:string) => (dispatch:Dispatch) => {
    console.log(newName)
    dispatch(setAppStatusAC('loading'))
    profileApi.changeName({name:newName})
        .then(res => {
            dispatch(changeNameAC(newName))
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