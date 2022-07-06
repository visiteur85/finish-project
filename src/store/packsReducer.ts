import {AppThunk} from "./store";
import {AnswerGetPackType, profileApi} from "../components/api/ApiProfile";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError} from "../utils/error-utils";


const initialState = {} as AnswerGetPackType;

export type PackReducerType = typeof initialState

export const packReducer = (state = initialState, action: PacksActionType): PackReducerType => {
    switch (action.type) {
        case "pack/GET-PACKS":
            return {...state, ...action.packs}
        default:
            return state
    }
};

export const getPacksDataAC = (packs: AnswerGetPackType) => ({
    type: "pack/GET-PACKS", packs} as const);
//types for AC

export type PacksActionType = ReturnType<typeof getPacksDataAC>



export const getPacksTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    profileApi.getPacks()
        .then((res) => {
            dispatch(getPacksDataAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            handleServerAppError(e, dispatch)
        })
    // .finally(() => {
    //     dispatch(signUpStatusAC('succeeded'))
    // })
}


