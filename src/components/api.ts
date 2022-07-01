import axios from 'axios'

// export const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
//     withCredentials: true,
// })
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || ' https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ParamsType>(`/auth/login`, data)
    },
    register(data: LoginParamsType) {
        debugger
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
