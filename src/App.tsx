import React, {useEffect} from 'react';
import './App.css';
import {NavBar} from "./components/Header/NavBar/NavBar";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ForgotPass} from "./components/ForgotPass/ForgotPass";
import {SetPassword} from "./components/setPassword/SetPassword";
import {Profile} from "./components/Profile/Profile";
import {Test} from "./components/Test/Test";
import {PageNotFound} from "./components/Page404/PageNotFound";
import {Login} from "./components/Login/Login";
import {Registration} from "./components/Registartion/Registration";
import {useAppDispatch, useAppSelector} from "./store/store";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {initializeAppTC} from "./store/app-reducer";
import Button from "@mui/material/Button";
import {logoutTC} from "./store/authReducer";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import { Navigate } from 'react-router-dom';
import {Cards} from "./components/Cards/Cards";



export const App = () => {
    const dispatch = useAppDispatch()
    const status=useAppSelector(state=>state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isLoggedIn=useAppSelector(state => state.auth.isLoggedIn)
    const navigate=useNavigate()

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


    const logoutHandler = () => {
        dispatch(logoutTC())
    };

    return (
        <div className="App">
            <ErrorSnackbar/>
            <NavBar/>
            {status === 'loading' && <LinearProgress color="success" />}
            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
            <Routes>
                <Route path={"login"} element={<Login/>}/>
                <Route path={"/"} element={<Profile/>}/>
                <Route path={"/cards"} element={<Cards/>}/>
                <Route path={"registration"} element={<Registration/>}/>
                <Route path={"forgotPass"} element={<ForgotPass/>}/>
                <Route path={"setPass"} element={<SetPassword/>}/>
                <Route path={"profile"} element={<Profile/>}/>
                <Route path={"test"} element={<Test/>}/>
                <Route path={"404"} element={<PageNotFound/>}/>
                <Route path="*" element={<Navigate to={"404"}/>}/>
            </Routes>
        </div>
    );
}


