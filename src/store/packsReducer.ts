import {AppThunk} from "./store";
import {setAppStatusAC} from "./appReducer";
import {handleServerAppError} from "../utils/error-utils";
import {AnswerGetPackType, OnePackType, PacksApi, sortPacksUpdateType} from "../components/api/packsApi";


const initialState = {
    cardPacks: [] as OnePackType[],
    cardPacksTotalCount: 0,
    filterForPacks: {
        minCardsCount: 0,
        maxCardsCount: 100,
        pageCount: 4,
        page: 1,
        sortPacksUpdate: "0updated",
        packName: '' as string,
        user_id: '' as string,
        packUserId: '' as string,
        private: false,
        deckCover:""
    },
} as AnswerGetPackType

export type PackReducerType = typeof initialState

export const packReducer = (state = initialState, action: PacksActionType): PackReducerType => {
    switch (action.type) {
        case "pack/GET-PACKS":
            return {...state, ...action.packs}
        case "pack/CHANGE-COUNT-ROWS":
            return {...state, filterForPacks: {...state.filterForPacks, pageCount: action.countOfRows}}
        case "pack/SET-MIN-MAX-ROWS":
            return {
                ...state, filterForPacks: {
                    ...state.filterForPacks,
                    minCardsCount: action.minMaxValue[0],
                    maxCardsCount: action.minMaxValue[1]
                }
            }
        case "pack/CHANGE-CURRENT-PAGE":
            return {...state, filterForPacks: {...state.filterForPacks, page: action.currentPage}}
        case "pack/SET-SEARCH-PACKS-NAME":
            return {
                ...state, filterForPacks: {
                    ...state.filterForPacks, packName: action.packName
                }
            }
        case "pack/SHOW-MY-PACKS":
            return {
                ...state, filterForPacks: {
                    ...state.filterForPacks, user_id: action.user_id
                }
            }
        case "pack/SORT-PACKS":
            return {...state, filterForPacks: {...state.filterForPacks, sortPacksUpdate: action.sort}}
        case "pack/SET-PACK-USER-ID":
            return {...state, filterForPacks: {
                    ...state.filterForPacks, packUserId: action.packUserId
                }
            }
        case "pack/PRIVATE-PACKS":
            return {...state, filterForPacks:
                    {...state.filterForPacks, private: action.privatePacks}}
        default:
            return state
    }
};
//AC
export const setSearchNamePacksAC = (packName: string) => ({type: "pack/SET-SEARCH-PACKS-NAME", packName} as const)
export const getPacksDataAC = (packs: AnswerGetPackType) => ({type: "pack/GET-PACKS", packs} as const);
export const setPrivatePacksAC = (privatePacks: boolean) => ({type: "pack/PRIVATE-PACKS", privatePacks} as const);
export const changeCountOfRawsAC = (countOfRows: number) => ({type: "pack/CHANGE-COUNT-ROWS", countOfRows} as const);
export const setMinMaxAmountOfCardsAC = (minMaxValue: number[]) => ({type: "pack/SET-MIN-MAX-ROWS", minMaxValue} as const);
export const changeCurrentPageAC = (currentPage: number) => ({type: "pack/CHANGE-CURRENT-PAGE",currentPage} as const);
export const showPyPacksAC = (user_id: string | null) => ({type: "pack/SHOW-MY-PACKS", user_id} as const);
export const sortPacksAc = (sort: sortPacksUpdateType) => ({type: "pack/SORT-PACKS", sort} as const);
export const setPackUserIdAC = (packUserId: string) => ({type: 'pack/SET-PACK-USER-ID', packUserId} as const)


//types for AC
export type PacksActionType =
    ReturnType<typeof getPacksDataAC>
    | ReturnType<typeof changeCountOfRawsAC>
    | ReturnType<typeof setMinMaxAmountOfCardsAC>
    | ReturnType<typeof changeCurrentPageAC>
    | ReturnType<typeof setSearchNamePacksAC>
    | ReturnType<typeof showPyPacksAC>
    | ReturnType<typeof changeCountOfRawsAC>
    | ReturnType<typeof setMinMaxAmountOfCardsAC>
    | ReturnType<typeof changeCurrentPageAC>
    | ReturnType<typeof sortPacksAc>
    | ReturnType<typeof setPackUserIdAC>
    | ReturnType<typeof setPrivatePacksAC>

//thunks
export const getPacksTC = (): AppThunk =>async (dispatch, getState) => {
    try {
        let model = getState().packs.filterForPacks

        dispatch(setAppStatusAC('loading'))
        let res = await PacksApi.getPack(model)
        dispatch(getPacksDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    }
    catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
};


export const deletePackTC = (idPack: string): AppThunk =>async (dispatch,) => {
   try {
       dispatch(setAppStatusAC('loading'))
       await PacksApi.delPack(idPack)
       dispatch(getPacksTC())
       dispatch(setAppStatusAC('succeeded'))
   } catch (e: any) {
       handleServerAppError(e, dispatch)
   } finally {
       dispatch(setAppStatusAC('idle'))
   }
}

export const changePackTC = (idPack: string, name: string,file:string): AppThunk =>async (dispatch,) => {
   try {
       dispatch(setAppStatusAC('loading'))
       await PacksApi.changePack(idPack, name,file)
       dispatch(getPacksTC())
       dispatch(setAppStatusAC('succeeded'))
   } catch (e: any) {
       handleServerAppError(e, dispatch)
   } finally {
       dispatch(setAppStatusAC('idle'))
   }
}

export const addNewPackTS = (newName: string, privatePacks:boolean, file:string ): AppThunk =>async (dispatch,) => {
  try {
      dispatch(setAppStatusAC('loading'))
      await PacksApi.addNewPack(newName,privatePacks, file)
      dispatch(getPacksTC())
      dispatch(setAppStatusAC('succeeded'))
  } catch (e: any) {
      handleServerAppError(e, dispatch)
  } finally {
      dispatch(setAppStatusAC('idle'))
  }
}