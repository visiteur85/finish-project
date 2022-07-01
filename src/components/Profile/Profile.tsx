import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import styleContainer from "../../style/Container.module.css"
import style from "../Profile/Profile.module.css"
import {Slider} from "@mui/material";
import {changeNameTC} from "../../store/profileReducer";

export const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const profile = useAppSelector(state => state.profile);
    const [editMode, setEditMode] = useState(false)
    const [name, SetNewName] = useState<string>(profile.name)
    const [error, SetError] = useState<null | string>(null)
    const dispatch = useAppDispatch()

    const editModeHandler = () => {
        setEditMode(true)
    }
    const onBlurHandler = () => {
        if (name.trim() !== "") {
            dispatch(changeNameTC(name))
            setEditMode(false)
            SetError(null)
        } else {
            SetError("Введите текст")
        }
    }

    const onChangeHandler = (e: any) => {
        SetError(null)
        let newValue = e.currentTarget.value
        SetNewName(newValue)
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    return (
        <div className={styleContainer.container}>
            <div className={style.profileHeader}>
                <div className={style.headerProfileHeader}>It-incubator</div>
            </div>
            <div className={style.mainProfile}>
                <div className={style.profileWithTable}>
                    <div className={style.profile}>
                        <div className={style.profileInfo}>
                            <div>
                                <img className={style.imagForProfile}
                                     src="https://im.kommersant.ru/Issues.photo/OGONIOK/2014/031/KMO_121006_03711_1_t218_105126.jpg"
                                     alt="avatar"/>
                            </div>
                            <div className={style.changeInput}>
                                {editMode ?
                                    <input className={error ? style.errorInput : ""}
                                           onChange={onChangeHandler} value={name}
                                           onBlur={onBlurHandler} autoFocus

                                    />
                                    :
                                    <p onDoubleClick={editModeHandler}
                                       className={style.nameOfProfile}>{profile.name}</p>}
                            </div>
                            {error && <div className={style.error}>{error}</div>}
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
