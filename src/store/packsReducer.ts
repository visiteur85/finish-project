import {AppThunk, RootState} from "./store";
import {setAppStatusAC} from "./app-reducer";

import {handleServerAppError} from "../utils/error-utils";
import {AnswerGetPackType, OnePackType, PacksApi, sortPacksUpdateType} from "../components/api/packsApi";
import {loginTC} from "./authReducer";


const initialState = {
    cardPacks: [] as OnePackType[],
    cardPacksTotalCount: 0,

    filterForPacks: {
        minCardsCount: 0,
        maxCardsCount: 100,
        pageCount: 4,
        page: 1,
        sortPacksUpdate: "0updated",

        packName: ''  as string,
        user_id:''  as string
    }

} as AnswerGetPackType
//
export type PAckReducerType = typeof initialState

export const packReducer = (state = initialState, action: PacksActionType): PAckReducerType => {
    switch (action.type) {
        case "pack/GET-PACKS": {

            return {...state, ...action.packs}
        }
        case "pack/CHANGE-COUNT-ROWS": {

            return {...state, filterForPacks: {...state.filterForPacks, pageCount: action.countOfRows}}
        }
        case "pack/SET-MIN-MAX-ROWS": {

            return {
                ...state,
                filterForPacks: {
                    ...state.filterForPacks,
                    minCardsCount: action.minMaxValue[0],
                    maxCardsCount: action.minMaxValue[1]
                }
            }
        }
        case "pack/CHANGE-CURRENT-PAGE": {
            return {...state, filterForPacks: {...state.filterForPacks, page: action.currentPage}}}
        case "pack/SET-SEARCH-PACKS-NAME":{
            return {...state, filterForPacks: {
                    ...state.filterForPacks, packName: action.packName
                }}}
        case "pack/SHOW-MY-PACKS":{
            return {...state, filterForPacks: {
                    ...state.filterForPacks, user_id: action.user_id
                }}
        }
        case "pack/SORT-PACKS": {
            return {...state, filterForPacks: {...state.filterForPacks, sortPacksUpdate: action.sort}}
        }

        // case "pack/ADD-NEW-PACK": {
        //     return {...state, cardPacks: state.cardPacks.map(m=> )}
        // }


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
export const showPyPacksAC = (user_id: string | null) => ({type: "pack/SHOW-MY-PACKS", user_id} as const);

export const sortPacksAc = (sort: sortPacksUpdateType) => ({
    type: "pack/SORT-PACKS",
    sort: sort
} as const);




//types for AC
export type PacksActionType = ReturnType<typeof getPacksDataAC>
    | ReturnType<typeof changeCountOfRawsAC> | ReturnType<typeof setMinMaxAmountOfCardsAC>
    | ReturnType<typeof changeCurrentPageAC> | ReturnType<typeof setSearchNamePacksAC>| ReturnType<typeof showPyPacksAC>
    | ReturnType<typeof changeCountOfRawsAC> | ReturnType<typeof setMinMaxAmountOfCardsAC> |
    ReturnType<typeof changeCurrentPageAC> |
    ReturnType<typeof sortPacksAc>
    // ReturnType<typeof addNewPack>



//thunks


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


export const deletePackTC = (idPack: string  ): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    let model  = getState().packs.filterForPacks
    PacksApi.delPack(idPack)
        .then((res)=> {
            PacksApi.getPack(model)
                .then((res) => {
                    dispatch(getPacksDataAC(res.data))
                    dispatch(setAppStatusAC('succeeded'))
                })

                .catch(e => {
                    handleServerAppError(e,dispatch)
                })
        })}

export const changePackTC = (idPack: string  ): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    let model  = getState().packs.filterForPacks
    PacksApi.changePack(idPack)
        .then((res)=> {
            PacksApi.getPack(model)
                .then((res) => {
                    dispatch(getPacksDataAC(res.data))
                    dispatch(setAppStatusAC('succeeded'))
                })

                .catch(e => {
                    handleServerAppError(e,dispatch)
                })
        })}


export const addNewPackTS = (newName:string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
  let model  = getState().packs.filterForPacks
    PacksApi.addNewPack(newName)
        .then((res) => {
        if(res.status === 201){
            PacksApi.getPack(model)
                .then((res) => {
                    dispatch(getPacksDataAC(res.data))
                    dispatch(setAppStatusAC('succeeded'))
                })

                .catch(e => {
                    handleServerAppError(e,dispatch)
                })
        }

    })

};
