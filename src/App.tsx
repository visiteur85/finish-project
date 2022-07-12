import React, {useEffect} from 'react';
import './App.css';
import {NavBar} from "./components/Header/NavBar/NavBar";
import {Navigate, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Test} from "./components/Test/Test";
import {PageNotFound} from "./components/Page404/PageNotFound";
import {useAppDispatch, useAppSelector} from "./store/store";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {initializeAppTC} from "./store/app-reducer";
import Button from "@mui/material/Button";
import {logoutTC} from "./store/authReducer";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {Cards} from "./components/Cards/Cards";
import {Registration} from "./components/Auth/Registartion/Registration";
import {SetPassword} from "./components/Auth/setPassword/SetPassword";
import {ForgotPass} from "./components/Auth/ForgotPass/ForgotPass";
import {CheckEmail} from "./components/Auth/ForgotPass/checkEmail/CheckEmail";
import {Login} from "./components/Auth/Login/Login";

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PACKS: '/packs',
    CARDS: '/cards',
    LEARN: '/learn',
    TEST_MAP: '/test-map',
    TEST: '/text',
};

export const App = () => {
    const dispatch = useAppDispatch()
    const status=useAppSelector(state=>state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isLoggedIn=useAppSelector(state => state.auth.isLoggedIn)
    const navigate=useNavigate()
    const {token} = useParams<string>()

    useEffect(() => {
        if (!isInitialized) {
            dispatch(initializeAppTC())
        }
    }, [isInitialized, dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    // http://localhost:3000/#/set-new-password/?token=d6666f00-fad8-11ec-b7ab-979eef7aec19
    const logoutHandler = () => {
        dispatch(logoutTC())
    };

    return (
        <div className="App">
            <ErrorSnackbar/>
            <NavBar/>
            {status === 'loading' && <LinearProgress color="success" />}

            {isLoggedIn && <div style={{marginBottom:"5px"}}>
                <Button style={{width:"150px"}} onClick={logoutHandler} variant="outlined" color="error">
                Logout
                </Button>
            </div>
            }
            <Routes>
                <Route path={"login"} element={<Login/>}/>
                <Route path={"/"} element={<Profile/>}/>
                <Route path={"/cards"} element={<Cards/>}/>
                <Route path={"registration"} element={<Registration/>}/>
                <Route path={"forgotPass"} element={<ForgotPass/>}/>
                <Route path={"setPass"} element={<SetPassword/>}/>
                <Route path={"setPass/:token"} element={<SetPassword/>}/>
                <Route path={"profile"} element={<Profile/>}/>
                <Route path={"test"} element={<Test/>}/>
                <Route path={"404"} element={<PageNotFound/>}/>
                <Route path="*" element={<Navigate to={"404"}/>}/>
                <Route path={"cards/:id"} element={<Cards/>}/>
                <Route path={"checkEmail"} element={<CheckEmail/>}/>
            </Routes>
        </div>
    );
}


