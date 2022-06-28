import React, { useState} from 'react';
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";

import style from "../Profile/Profile.module.css"
import {Slider} from "@mui/material";

import {SuperInput} from "../Test/universalComponents/SuperInput/SuperInput";

export const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const profile = useAppSelector(state => state.profile);
    const [editMode, setEditMode] = useState(false)


    const dispatch = useAppDispatch()


    const editModeHandler = () => {
        setEditMode(true)
    }
    const onBlurHandler = () => {
        setEditMode(false)
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.profileContainer}>
            <div className={style.profileHeader}>
                <div className={style.headerProfileHeader}>It-incubator</div>
            </div>
            <div className={style.mainProfile}>
                <div className={style.profileWithTable}>
                    <div className={style.profile}>
                        <div className={style.profileInfo}>
                            <div>
                                <img className={style.imagForProfile}
                                     src="https://billionnews.ru/uploads/posts/2021-09/1631790015_2.jpg" alt="avatar"/>
                            </div>
                            {editMode ? <SuperInput onBlur={onBlurHandler} autoFocus/> :
                                <p onDoubleClick={editModeHandler} className={style.nameOfProfile}>{profile.email}</p>}

                            <p className={style.description}>Front-end developer</p>
                        </div>
                        <div className={style.numberOfCards}>
                            <p className={style.nameOfDescription}>Number of cards</p>
                            <div className={style.slider}>
                                <Slider
                                    // size="middle"
                                    defaultValue={70}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                />
                            </div>

                        </div>
                    </div>
                    <div className={style.table}>Table</div>
                </div>
            </div>
        </div>
    );
};
