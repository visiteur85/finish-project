import {ProfileType} from "../components/api/api";
import {AppThunk} from "./store";
import {setAppStatusAC} from "./appReducer";
import {profileApi} from "../components/api/profileApi";
import {handleServerAppError} from "../utils/error-utils";


const initialState = {
    profile: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
        created: null,
        updated: null,
        isAdmin: false,
        verified: false,
        rememberMe: false,
    } as ProfileType,
    error: ''
};

export type ProfileReducerType = typeof initialState

export const profileReducer = (state = initialState, action: ProfileActionType): ProfileReducerType => {
    switch (action.type) {
        case "profile/GET-PROFILE":
            return {...state, profile: action.profileData}
        case "profile/CHANGE-NAME":
            return {...state, profile: {...state.profile, name: action.newName}}
        case "profile/SAVE-PHOTO-SUCCESS":
            return {...state, profile: {...state.profile, avatar: action.avatar}}
        default:
            return state
    }
};

export const getProfileDataAC = (profileData: ProfileType) => ({type: "profile/GET-PROFILE", profileData} as const);
export const changeNameAC = (newName: string) => ({type: "profile/CHANGE-NAME", newName} as const);
export const savePhotoSuccess = (avatar: any) => ({type: 'profile/SAVE-PHOTO-SUCCESS', avatar}) as const

export type ProfileActionType = ReturnType<typeof getProfileDataAC> | ReturnType<typeof changeNameAC>
    | ReturnType<typeof savePhotoSuccess>

export const changeNameTC = (newName: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await profileApi.changeName(newName)
        dispatch(changeNameAC(newName))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const savePhoto = (avatar: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await profileApi.changeAvatar(avatar)
        dispatch(savePhotoSuccess(avatar))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }

}