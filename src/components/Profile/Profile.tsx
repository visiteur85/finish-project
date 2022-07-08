import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import styleContainer from "../../style/Container.module.css"
import style from "../Profile/Profile.module.css"
import {Slider} from "@mui/material";
import {changeNameTC} from "../../store/profileReducer";
import editPictureForInput from "../../style/images/pngwing.com.png"
import {EnhancedTable} from "./EnhancedTable/EnhancedTable";
import {getPacksTC, setMinMaxAmountOfCardsAC} from "../../store/packsReducer";
import {OnePackType} from "../api/packsApi";

const useDebounce = (value1: number = 0,value2:number = 0, delay: number): number[] => {
    let [state, setState] = useState<number[]>([value1,value2])

    useEffect(() => {
        const timeId = setTimeout(() => {
            setState([value1,value2])
        }, delay)

        return () => {
            clearTimeout(timeId)
        }
    }, [value1,value2])

    return state
}


export const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const profile = useAppSelector(state => state.profile.profile);
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState(false);

    const [name, SetNewName] = useState<string>(profile && profile.name ? profile.name : '')

    const [error, SetError] = useState<null | string>(null);

    const minAmount = useAppSelector(state => state.packs.filterForPacks.minCardsCount);

    const maxAmount = useAppSelector(state => state.packs.filterForPacks.maxCardsCount);

    const minMAxAmount = [minAmount || 0, maxAmount || 100]

    const editPicture = {
        backgroundImage: `url(${editPictureForInput})`,

    }

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

    let debouncedValue = useDebounce(minAmount,maxAmount, 1000);
    console.log(debouncedValue)
    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(setMinMaxAmountOfCardsAC(newValue as number[]));
    };

    useEffect(() => {
        if (debouncedValue) {
            dispatch(getPacksTC())
        }
    }, [debouncedValue])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    return (

        <div className={styleContainer.container}>

            {/*<div className={style.profileHeader}>*/}
            {/*    <div className={style.headerProfileHeader}>It-incubator</div>*/}
            {/*    <div className={style.buttonsForNavigate}>*/}
            {/*        <div className={style.PacksList}>*/}
            {/*            <div>*/}
            {/*            <img src={packsListAvatar} alt="packsListAvatar"/>*/}
            {/*            </div>*/}
            {/*            <p>Packs list</p>*/}

            {/*        </div>*/}
            {/*        <div className={style.ProfileList}>*/}
            {/*            <div>*/}
            {/*            <img src={profileAvatar} alt="profileAvatar"/>*/}
            {/*            </div>*/}
            {/*            <p> Profile</p>*/}

            {/*        </div>*/}
            {/*    </div>*/}


            {/*</div>*/}
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
                                           maxLength={20}
                                    />
                                    :
                                    <p data-tooltip={"Изменить имя"} className={style.nameOfProfile}>{profile.name}
                                        <button onClick={editModeHandler}
                                                style={editPicture}></button>
                                    </p>

                                }
                            </div>
                            {error && <div className={style.error}>{error}</div>}
                            <p className={style.description}>Front-end developer</p>
                        </div>
                        <div className={style.numberOfCards}>
                            <p className={style.nameOfDescription}>Number of cards</p>
                            <div className={style.slider}>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={minMAxAmount}
                                    defaultValue={[0, 100]}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    // getAriaValueText={valuetext}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.table}>

                        <EnhancedTable/>

                    </div>
                </div>
            </div>
        </div>
    );
};
