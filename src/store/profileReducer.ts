import {ParamsType} from "../components/api";



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
    error: "string | null"
};

export const profileReducer = (state = initialState, action: ProfileActionType) => {
    switch (action.type) {
        case "GET-PROFILE": {

            return action.ProfileData
        }
        default: return state
    }
};


export type getProfileDataType = ReturnType<typeof getProfileDataAC>

export const getProfileDataAC = (ProfileData: ParamsType) => ({
    type: "GET-PROFILE", ProfileData} as const
    )


export type ProfileActionType = getProfileDataType