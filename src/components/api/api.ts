import {instance} from './profileApi'

// export const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
//     withCredentials: true,
// })


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ProfileType>(`/auth/login`, data)
    },
    register(data: LoginParamsType) {
        return instance.post<LoginParamsType>(`/auth/register`, data)
    },
    me() {
        return instance.post(`/auth/me`)
    },
    logout() {
        return instance.delete(`/auth/me`)
    },
}


export type ProfileType = {
    _id: string
    email: string | null
    name: string | null
    avatar: string | null
    publicCardPacksCount: number | null
    created: string | null
    updated: string | null
    isAdmin: boolean | null
    verified: boolean | null
    rememberMe: boolean | null
    error?: string | null
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

