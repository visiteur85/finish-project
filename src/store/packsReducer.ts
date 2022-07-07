
import {AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";

import {handleServerAppError} from "../utils/error-utils";
import {AnswerGetPackType, OnePackType, PacksApi} from "../components/api/packsApi";
import {loginTC} from "./authReducer";


const initialState  = {
    cardPacks: [] as OnePackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0

} as AnswerGetPackType
//
export type PAckReducerType = typeof initialState

export const packReducer = (state = initialState, action: PacksActionType): PAckReducerType => {
    switch (action.type) {
        case "pack/GET-PACKS":

        return {...state, ...action.packs}

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

};

export const getPacksWithCardsContityTC = (arrOfCards:number[]): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    PacksApi.getPackWithCardsContity(arrOfCards)
        .then((res) => {
            console.log(res.data)
            dispatch(getPacksDataAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })

};