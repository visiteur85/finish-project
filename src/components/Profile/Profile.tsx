import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {initializeAppTC} from "../Initialized/app-reducer";

export const Profile = () => {
    const isLoggedIn=useAppSelector(state => state.auth.isLoggedIn)
    const navigate=useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch( initializeAppTC());
        } else {
            navigate('/login')
        }
    }, [isLoggedIn])
    return (
        <div>
            Profile
        </div>
    );
};
