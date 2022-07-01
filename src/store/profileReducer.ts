import {ParamsType} from "../components/api";
import {AppThunk} from "./store";
import {setAppStatusAC} from "../components/Initialized/app-reducer";
import {profileApi} from "../components/ApiProfile";
import {Dispatch} from "redux";
import {handleServerAppError} from "../utils/error-utils";


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
        case "profile/GET-PROFILE":
            return {...state, ...action.ProfileData}
        case "profile/CHANGE-NAME":
            return {...state, name:action.newName}
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
export const changeNameTC = (newName:string): AppThunk  => (dispatch:Dispatch) => {
    console.log(newName)
    dispatch(setAppStatusAC('loading'))
    profileApi.changeName({name:newName})
        .then(res => {
            dispatch(changeNameAC(newName))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            handleServerAppError(e,dispatch)
        })
    // .finally(() => {
    //     dispatch(signUpStatusAC('succeeded'))
    // })
}