import {ProfileType} from "../components/api/api";
import {AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {profileApi} from "../components/api/profileApi";
import {handleServerAppError} from "../utils/error-utils";


const initialState = {
    profile: {
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
    } as ProfileType,
    error: ''
};
// const initialState = {
//     profile: null as null | ProfileType  ,
//     error: ''
// };
//    ???? How do it?
export type ProfileReducerType = typeof initialState

export const profileReducer = (state = initialState, action: ProfileActionType): ProfileReducerType => {
    switch (action.type) {
        case "profile/GET-PROFILE":
            return {...state, profile: action.ProfileData}
        case "profile/CHANGE-NAME":
            return {...state, profile: {...state.profile, name: action.newName}}
        case "profile/SAVE-PHOTO-SUCCESS":
            return {...state, profile: {...state.profile, avatar: action.avatar}}
        default:
            return state
    }
};

export const getProfileDataAC = (profileData: ProfileType) => ({
    type: "profile/GET-PROFILE",
    ProfileData: profileData
} as const);
export const changeNameAC = (newName: string) => ({type: "profile/CHANGE-NAME", newName} as const);
export const savePhotoSuccess = (avatar: any) => ({type: 'profile/SAVE-PHOTO-SUCCESS', avatar}) as const


export type ProfileActionType = ReturnType<typeof getProfileDataAC> | ReturnType<typeof changeNameAC>
    | ReturnType<typeof savePhotoSuccess>

//thunks
export const changeNameTC = (newName: string): AppThunk => (dispatch) => {

    dispatch(setAppStatusAC('loading'))
    profileApi.changeName(newName)
        .then(() => {
            dispatch(changeNameAC(newName))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            handleServerAppError(e, dispatch)
        })
}
export const savePhoto = (avatar: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    profileApi.changeAvatar(avatar)
        .then(() => {
            dispatch(savePhotoSuccess(avatar))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            handleServerAppError(e, dispatch)
        })

}