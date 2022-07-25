import {AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError} from "../utils/error-utils";
import {cardsApi, RequestCardType} from "../components/api/cardsApi";
import {setPackUserIdAC, showPyPacksAC} from "./packsReducer";

const initialState = {
    // cardsTotalCount:0,

} as RequestCardType;

export type CardsReducerType = typeof initialState

export const cardsReducer = (state = initialState, action: CardssActionType): CardsReducerType => {
    switch (action.type) {
        case "cards/GET-CARDS":
            return {...state, ...action.cards}
        case "cards/change-GRADE":{
            return {...state, cards: state.cards.map(card=> card._id === action.card_id ? {...card, grade:action.grade} : card)}
        }
        case "cards/CHANGE-CURRENT-PAGE":
            return {...state, page: action.currentPage}
        case "cards/CHANGE-COUNT-ROWS":
            return {...state, pageCount: action.countOfRows}
        default:
            return state
    }
};

export const getCardsDataAC = (cards: RequestCardType) => ({type: "cards/GET-CARDS", cards} as const);

export type CardssActionType = ReturnType<typeof getCardsDataAC> | ReturnType<typeof changeGradeAC> |
ReturnType<typeof changeCurrentPageCardsAC> | ReturnType<typeof changeCountOfRawsCardsAC>


export const changeGradeAC = (grade:number, card_id:string) => ({type: "cards/change-GRADE", grade, card_id} as const);
export const changeCurrentPageCardsAC = (currentPage: number) => ({type: "cards/CHANGE-CURRENT-PAGE",currentPage} as const);
export const changeCountOfRawsCardsAC = (countOfRows: number) => ({type: "cards/CHANGE-COUNT-ROWS", countOfRows} as const);



export const getCardsTC = (cardsPack_id: string,): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let res = await cardsApi.getCards(cardsPack_id, Infinity )
        dispatch(setPackUserIdAC(res.data.packUserId))
        dispatch(showPyPacksAC(cardsPack_id))
        dispatch(getCardsDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const addNewCardsTC = (cardsPack_id: string, question?: string, answer?: string): AppThunk => async (dispatch, ) => {

    const newCard = {cardsPack_id, question, answer}

    try {
        dispatch(setAppStatusAC('loading'))
        await cardsApi.addCards(newCard)
        dispatch(getCardsTC(cardsPack_id))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const updateCardsTC = (_id: string, question?: string, answer?: string, cardsPack_id?: string): AppThunk => async (dispatch, ) => {

    const newCard = {_id, question, answer}

    try {
        dispatch(setAppStatusAC('loading'))
        await cardsApi.changeCards(newCard)
        if(cardsPack_id) {
            dispatch(getCardsTC(cardsPack_id))
        }
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const deleteCardsTC = (packId: string, cardsPack_id: string): AppThunk => async (dispatch, ) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await cardsApi.deleteCards(cardsPack_id)
        dispatch(getCardsTC(packId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const changeGradeTC = (grade:number, card_id:string): AppThunk => async (dispatch, ) => {

    try {
        dispatch(setAppStatusAC('loading'))
        let res = await cardsApi.changeGrade(grade, card_id)
        dispatch(changeGradeAC(res.data.grade, res.data.card_id ))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

