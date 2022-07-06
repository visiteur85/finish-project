import axios from "axios";


export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})
// export const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL || ' https://neko-back.herokuapp.com/2.0',
//     withCredentials: true,
// })

export const PacksApi = {
    getPack() {
        return instance.get<AnswerGetPackType>(`cards/pack`)
    }
}


//types

export type AnswerGetPackType = {
    cardPacks: OnePackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
};

export type OnePackType = {
    _id: string
    user_id: string
    user_name:string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
}