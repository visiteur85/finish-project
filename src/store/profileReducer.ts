import {ParamsType} from "../components/api/api";
import {AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {profileApi} from "../components/api/ApiProfile";
import {handleServerAppError} from "../utils/error-utils";


const initialState: ParamsType  = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: null, //0
    updated: null, //0 works will be
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: "",
};
//    ???? How do it?
export type ProfileReducerType = typeof initialState

export const profileReducer = (state = initialState, action: ProfileActionType):ParamsType => {
    switch (action.type) {
        case "profile/GET-PROFILE":
            return {...state, ...action.ProfileData}
        case "profile/CHANGE-NAME":
            return {...state, name:action.newName}
        default: return state
    }
};



export const getProfileDataAC = (profileData: ParamsType) => ({type: "profile/GET-PROFILE", ProfileData: profileData} as const);
export const changeNameAC = (newName: string) => ({type: "profile/CHANGE-NAME", newName} as const);
//types for AC
export type ProfileActionType = ReturnType<typeof getProfileDataAC> | ReturnType<typeof changeNameAC>

//thunks
export const changeNameTC = (newName:string): AppThunk  => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    profileApi.changeName({name:newName})
        .then(() => {
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