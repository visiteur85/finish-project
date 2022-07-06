import axios from "axios";
import {ProfileType} from "./api";
// import {ParamsType} from "./api";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})
// export const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL || ' https://neko-back.herokuapp.com/2.0',
//     withCredentials: true,
// })

export const profileApi = {
    changeName(data:ChangeProfileType) {
        return instance.put<AnswerChangeProfileType>(`/auth/me`, data)
    }
}


//types
export type ChangeProfileType = {
    name: string
    avatar?: string
}

export type AnswerChangeProfileType = {
    updatedUser: ProfileType
    error?:string
}