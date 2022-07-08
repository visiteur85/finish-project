import axios from "axios";
import {ProfileType} from "./api";

// export const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
//     withCredentials: true,
// })
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || ' https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})


export const cardsApi = {
    getCards(cardsPack_id: string) {
        return instance.get<RequestCardType>(`/cards/card`, {params: {cardsPack_id}})
    }
}

//types
export type ChangeProfileType = {
    name: string
    avatar?: string
}

export type AnswerChangeProfileType = {
    updatedUser: ProfileType
    error?: string
}

export type AnswerGetPackType = {
    cardPacks: OnePackType[]
    cardPacksTotalCount: number    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number// выбранная страница
    pageCount: number    // количество элементов на странице
    packName: string // name for search

    // packName:''//поиск по имени
    // &min=3 // не обязательно
    // &max=9 // не обязательно
    // &sortPacks=0updated // не обязательно сортировать по grade
    // &page=1 // не обязательно
    // &pageCount=4 // не обязательно
    // &user_id=5eb543f6bea3ad21480f1ee7 - май олл
    // чьи колоды не обязательно, или прийдут все

};

export type OnePackType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number // сколько карточек в калоде
    grade: number // звездочкм
    shots: number // кол во раз сколько нажали оценок
    rating: number
    type: string
    created: string
    updated: string
    __v: number
    user_name: string
    private: boolean, // тру вижу только я
}
// card
//     ?cardAnswer=english // не обязательно
//     &cardQuestion=english // не обязательно
//     &cardsPack_id=5eb6a2f72f849402d46c6ac7
//     &min=1 // не обязательно
//     &max=4 // не обязательно
//     &sortCards=0grade // не обязательно
// &page=1 // не обязательно
// &pageCount=7 // не обязательно
export type RequestCardType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}