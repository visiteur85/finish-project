import axios from "axios";


// export const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
//     withCredentials: true,
// })
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || ' https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

// export const PacksApi = {
//     getPack() {
//         return instance.get<AnswerGetPackType>(`cards/pack`)
//     },
//     getPackWithCardsContity(arrOfCards:number[]) {
//         return instance.get<AnswerGetPackType>(`cards/pack?min=${arrOfCards[0]}&max=${arrOfCards[1]}`)
//     },
//     changeCountOfpages(countOfPages:number) {
//         return instance.get<AnswerGetPackType>(`cards/pack?pageCount=${countOfPages}`)
//     },
// }

export const PacksApi = {
    getPack(value:FilterForPacksType) {
        return instance.get<AnswerGetPackType>(`cards/pack?min=${value.minCardsCount}&max=${value.maxCardsCount}&pageCount=${value.pageCount}&page=${value.page}`)
    },
    // getPackWithCardsContity(arrOfCards:number[]) {
    //     return instance.get<AnswerGetPackType>(`cards/pack?min=${arrOfCards[0]}&max=${arrOfCards[1]}`)
    // },
    // changeCountOfpages(countOfPages:number) {
    //     return instance.get<AnswerGetPackType>(`cards/pack?pageCount=${countOfPages}`)
    // },
}

//types



export type AnswerGetPackType = {
    cardPacks: OnePackType[]
    cardPacksTotalCount: number
   filterForPacks: FilterForPacksType



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

export type FilterForPacksType = {
    minCardsCount?: number
    maxCardsCount?: number
    pageCount?: number
    page?: number

}