import React from 'react';
import {NavLink} from "react-router-dom";
import s from "./NavBar.module.css"

export const NavBar = () => {
    return (
        <nav className={s.navBar}>
            <div className={s.item}><NavLink to="/login" className={({isActive})=> isActive ? s.active : s.item}>Login</NavLink></div>
            <div className={s.item}><NavLink to="/registration" className={({isActive})=> isActive ? s.active : s.item}>Registration</NavLink></div>
            <div className={s.item}><NavLink to="/forgotPass" className={({isActive})=> isActive ? s.active : s.item}>Forgot Password</NavLink></div>
            <div className={s.item}><NavLink to="/setPass" className={({isActive})=> isActive ? s.active : s.item}>Set Password</NavLink></div>
            <div className={s.item}><NavLink to="/profile" className={({isActive})=> isActive ? s.active : s.item}>Profile</NavLink></div>
            <div className={s.item}><NavLink to="/cards" className={({isActive})=> isActive ? s.active : s.item}>Cards</NavLink></div>
            <div className={s.item}><NavLink to="/test" className={({isActive})=> isActive ? s.active : s.item}>Test</NavLink></div>


        </nav>
    );
};

