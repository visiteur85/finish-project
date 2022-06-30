import axios, { AxiosResponse } from 'axios'

// const instance = axios.create({
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/',
//     withCredentials: true,
//     headers: {
//         'API-KEY': '28c4b33d-5608-4f66-821c-2b5b991e596b'
//     }
// })
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ParamsType>(`/auth/login`, data)
    },
    register(data: LoginParamsType) {
        return instance.post<LoginParamsType>(`/auth/register`, data)
    },
    me() {
        return instance.post(`/auth/me`)
    },
    logout() {
        return instance.delete(`auth/me`)
    },
}


// type
export type RegisterType<D = {}> = {
    addedUser:D
    error?: string;
}
export type ParamsType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date | null;
    updated: Date | null;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
export type ProfileType = {
    _id: string | null
    email: string | null
    name: string | null
    avatar: string | null
    publicCardPacksCount: number | null
    created: string | null
    updated: string | null
    isAdmin: boolean | null
    verified: boolean | null
    rememberMe: boolean | null
    error: string | null
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}
// isLoggedIn: false,
//     profile: {
//     _id: null as string | null,
//         email: null as string | null,
//         name: null as string | null,
//         avatar: null as string | null,
//         publicCardPacksCount: null as number | null,
//         created: null as string | null,
//         updated: null as string | null,
//         isAdmin: null as boolean | null,
//         verified: null as boolean | null,
//         rememberMe: null as boolean | null,
//         error: null  as string | null,
// },
// myId: null as string | null,