import React from 'react';

import './App.css';
import {NavBar} from "./components/Header/NavBar/NavBar";
import {Login} from "./components/Login/Login";
import {Registration} from "./components/Registartion/Registration";
import { Route, Routes} from "react-router-dom";
import {ForgotPass} from "./components/ForgotPass/ForgotPass";
import {SetPassword} from "./components/setPassword/SetPassword";
import {Profile} from "./components/Profile/Profile";
import {Test} from "./components/Test/Test";
import {PageNotFound} from "./components/Page404/PageNotFound";

const App = () => {
    return (
        <div className="App">
            <NavBar/>
            <Routes>
                <Route path={"login"} element={<Login/>}/>
                <Route path={"registration"} element={<Registration/>}/>
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
