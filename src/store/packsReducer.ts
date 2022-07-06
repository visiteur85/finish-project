
import {AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {profileApi} from "../components/api/ApiProfile";
import {handleServerAppError} from "../utils/error-utils";
import {AnswerGetPackType, OnePackType, PacksApi} from "../components/api/packsApi";
import {loginTC} from "./authReducer";


const initialState = {
} as AnswerGetPackType;
//
// export type PAckReducerType = typeof initialState

export const packReducer = (state = initialState, action: PacksActionType): AnswerGetPackType => {
    switch (action.type) {
        case "pack/GET-PACKS":
        return {...state,...action.packs}

        default:
            return state
    }
};

export const getPacksDataAC = (packs: AnswerGetPackType) => ({
    type: "pack/GET-PACKS",
    packs: packs
} as const);
//types for AC
export type PacksActionType = ReturnType<typeof getPacksDataAC>



//thunks
export const getPacksTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    PacksApi.getPack()
        .then((res) => {
            console.log(res.data)
            dispatch(getPacksDataAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        // .catch(e => {
        //     handleServerAppError(e, dispatch)
        // })
    // .finally(() => {
    //     dispatch(signUpStatusAC('succeeded'))
    // })
}