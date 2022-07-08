import {AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError} from "../utils/error-utils";
import {cardsApi, RequestCardType} from "../components/api/cardsApi";

const initialState = {} as RequestCardType;

export type CardsReducerType = typeof initialState

export const cardsReducer = (state = initialState, action: CardssActionType): CardsReducerType => {
    switch (action.type) {
        case "cards/GET-CARDS":
            return {...state, ...action.cards}
        default:
            return state
    }
};

export const getCardsDataAC = (cards: RequestCardType) => ({
    type: "cards/GET-CARDS", cards} as const);

export type CardssActionType = ReturnType<typeof getCardsDataAC>

export const getCardsTC = (cardsPack_id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsApi.getCards(cardsPack_id)
        .then((res) => {
            dispatch(getCardsDataAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            handleServerAppError(e, dispatch)
        })

}


