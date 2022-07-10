import {AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError} from "../utils/error-utils";
import {cardsApi, newCardType, RequestCardType} from "../components/api/cardsApi";
import {showPyPacksAC} from "./packsReducer";

const initialState = {} as RequestCardType;

export type CardsReducerType = typeof initialState

export const cardsReducer = (state = initialState, action: CardssActionType): CardsReducerType => {
    switch (action.type) {
        case "cards/GET-CARDS":
            return {...state, ...action.cards}
        case "cards/ADD-CARDS":
        default:
            return state
    }
};

export const getCardsDataAC = (cards: RequestCardType) => ({
    type: "cards/GET-CARDS", cards
} as const);
export const addNewCardsAC = (newCards: newCardType) => ({
    type: "cards/ADD-CARDS", newCards
} as const);

export type CardssActionType = ReturnType<typeof getCardsDataAC>
    | ReturnType<typeof addNewCardsAC>

export const getCardsTC = (cardsPack_id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        let res = await cardsApi.getCards(cardsPack_id)
        // dispatch(showPyPacksAC(res.data.data._id))
        dispatch(getCardsDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const addNewCardsTC = (cardsPack_id: string, question?: string, answer?: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const newCard = {
        cardsPack_id: cardsPack_id,
        question: question,
        answer: answer
    }
    cardsApi.addCards(newCard)
        .then((res) => {
            dispatch(getCardsTC(cardsPack_id))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            handleServerAppError(e, dispatch)
        })
}

