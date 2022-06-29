import React, {useEffect} from 'react';
import './App.css';
import {NavBar} from "./components/Header/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import {ForgotPass} from "./components/ForgotPass/ForgotPass";
import {SetPassword} from "./components/setPassword/SetPassword";
import {Profile} from "./components/Profile/Profile";
import {Test} from "./components/Test/Test";
import {PageNotFound} from "./components/Page404/PageNotFound";
import {Login} from "./components/LoginNew/Login";
import {Register} from "./components/Registartion/Register";
import {useAppDispatch, useAppSelector} from "./store/store";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {initializeAppTC} from "./components/Initialized/app-reducer";
import Button from "@mui/material/Button";
import {logoutTC} from "./components/LoginNew/authReducer";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import { Navigate } from 'react-router-dom';



const App = () => {
    const dispatch = useAppDispatch()
    const status=useAppSelector(state=>state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isRegistration = useAppSelector((state) => state.app.isRegistration)
    const isLoggedIn=useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isInitialized) {
            dispatch(initializeAppTC())
        }
    }, [isInitialized, dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    if (!isInitialized) {
        return <Navigate to={'/registration'}/>
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
                //@ts-ignore
                <Route path={"login"} element={<Login/>}/>
                <Route path={"/"} element={<Profile/>}/>
                <Route path={"registration"} element={<Register/>}/>
                <Route path={"forgotPass"} element={<ForgotPass/>}/>
                <Route path={"setPass"} element={<SetPassword/>}/>
                <Route path={"profile"} element={<Profile/>}/>
                <Route path={"test"} element={<Test/>}/>
                <Route path={"404"} element={<PageNotFound/>}/>
                {/*<Route path="*" element={<Navigate to={"404"}/>}/>*/}
            </Routes>
        </div>
    );
}

export default App;
