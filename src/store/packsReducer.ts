import {AppThunk, RootState} from "./store";
import {setAppStatusAC} from "./app-reducer";

import {handleServerAppError} from "../utils/error-utils";
import {AnswerGetPackType, OnePackType, PacksApi} from "../components/api/packsApi";
import {loginTC} from "./authReducer";


const initialState = {
    cardPacks: [] as OnePackType[],
    cardPacksTotalCount: 0,

    filterForPacks: {
        minCardsCount: 0,
        maxCardsCount: 100,
        pageCount: 4,
        page:1,
        packName: ''  as string,
    }

} as AnswerGetPackType
//
export type PAckReducerType = typeof initialState

export const packReducer = (state = initialState, action: PacksActionType): PAckReducerType => {
    switch (action.type) {
        case "pack/GET-PACKS":
            return {...state, ...action.packs}
        case "pack/CHANGE-COUNT-ROWS":
            return {...state, filterForPacks: {...state.filterForPacks, pageCount: action.countOfRows}}
        case "pack/SET-MIN-MAX-ROWS":
            return {...state, filterForPacks: {
                    ...state.filterForPacks,
                    minCardsCount: action.minMaxValue[0],
                    maxCardsCount: action.minMaxValue[1]
                }
            }
        case "pack/CHANGE-CURRENT-PAGE":
            return {...state, filterForPacks: {...state.filterForPacks, page: action.currentPage}}
        case "pack/SET-SEARCH-PACKS-NAME":
            return {...state, filterForPacks: {
                    ...state.filterForPacks, packName: action.packName
                }}
        default:
            return state
    }
};
//AC
export const setSearchNamePacksAC = (packName: string) => ({type: "pack/SET-SEARCH-PACKS-NAME", packName} as const)

export const getPacksDataAC = (packs: AnswerGetPackType) => ({
    type: "pack/GET-PACKS",
    packs: packs
} as const);

export const changeCountOfRawsAC = (countOfRows: number) => ({
    type: "pack/CHANGE-COUNT-ROWS",
    countOfRows: countOfRows
} as const);

export const setMinMaxAmountOfCardsAC = (minMaxValue: number[]) => ({
    type: "pack/SET-MIN-MAX-ROWS",
    minMaxValue: minMaxValue
} as const);

export const changeCurrentPageAC = (currentPage: number) => ({
    type: "pack/CHANGE-CURRENT-PAGE",
    currentPage: currentPage
} as const);

//types for AC
export type PacksActionType = ReturnType<typeof getPacksDataAC>
    | ReturnType<typeof changeCountOfRawsAC> | ReturnType<typeof setMinMaxAmountOfCardsAC>
    | ReturnType<typeof changeCurrentPageAC> | ReturnType<typeof setSearchNamePacksAC>

export const getPacksTC = (): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    let model = getState().packs.filterForPacks
    PacksApi.getPack(model)
        .then((res) => {
            dispatch(getPacksDataAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            handleServerAppError(e,dispatch)
        })
};

export const deletePackTC = (idPack: string | null): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    PacksApi.delPack(idPack)
        .then(() => {
            dispatch(getPacksTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            handleServerAppError(e,dispatch)
        })
}