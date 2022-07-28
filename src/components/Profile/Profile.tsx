import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import styleContainer from "../../style/Container.module.css"
import style from "../Profile/Profile.module.css"
import {Slider} from "@mui/material";
import {changeNameTC} from "../../store/profileReducer";
import {EnhancedTable} from "./EnhancedTable/EnhancedTable";
import {getPacksTC, setMinMaxAmountOfCardsAC, showPyPacksAC} from "../../store/packsReducer";
import avatar from "../../style/images/avatar.png"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Button from "@mui/material/Button";
import {PATH} from "../../App";
import {InputTypeFile} from "./InputTypeFile";

const useDebounce = (value1: number = 0, value2: number = 0, delay: number): number[] => {
    let [state, setState] = useState<number[]>([value1, value2])

    useEffect(() => {
        const timeId = setTimeout(() => {
            if(state[0] === value1 && state[1] === value2) return
            setState([value1, value2])
        }, delay)
        return () => {
            clearTimeout(timeId)
        }
    }, [delay, value1, value2])
    return state
}


export const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const minAmount = useAppSelector(state => state.packs.filterForPacks.minCardsCount);
    const maxAmount = useAppSelector(state => state.packs.filterForPacks.maxCardsCount);
    const user_id = useAppSelector(state => state.profile.profile._id)
    const profile = useAppSelector(state => state.profile.profile);
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState(false);
    const [name, SetNewName] = useState(profile && profile.name ? profile.name : '')
    const [error, SetError] = useState<null | string>(null);


    const minMAxAmount = [minAmount || 0, maxAmount || 100]

    const navigate = useNavigate()


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

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        SetError(null)
        SetNewName(e.currentTarget.value)
    }

    let debouncedValue = useDebounce(minAmount, maxAmount, 1000);

    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(setMinMaxAmountOfCardsAC(newValue as number[]));
    };

    useEffect(() => {
        if (debouncedValue) {
            dispatch(getPacksTC())
        }
    }, [debouncedValue, dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && onBlurHandler();

    const onClickForMyPacksHandler = () => {
        dispatch(showPyPacksAC(user_id))
        dispatch(getPacksTC())
    }

    const onClickForAllHandler = () => {
        dispatch(showPyPacksAC(null))
        dispatch(getPacksTC())
    }

    const toCards = () => {
      return  navigate(PATH.PROFILE)
    }

    // const goPathToProfileOrCards = (path: string) => {
    //     navigate(path)
    // }

    return (

        <div className={styleContainer.container}>
            {/*<div className={style.profileHeader}>*/}
            {/*    <div className={style.headerProfileHeader}>It-incubator</div>*/}
            {/*    <div className={style.buttonsForNavigate}>*/}
            {/*        <div*/}
            {/*        //     onClick={() => {goPathToProfileOrCards(`/cards/${user_id}`)*/}
            {/*        // }}*/}
            {/*              className={style.PacksList}>*/}
            {/*            /!*<NavLink to={`/cards/${user_id}`} className={({isActive})=> isActive ? style.active : ""}>*!/*/}
            {/*        <div className={style.PacksList} onClick={toCards} >*/}
            {/*            <div>*/}
            {/*                <img src={packsListAvatar} alt="packsListAvatar"/>*/}
            {/*            </div>*/}
            {/*            <p>Packs list</p>*/}
            {/*                /!*</NavLink>*!/*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            // onClick={() => {goPathToProfileOrCards("/profile")}}*/}
            {/*            className={style.ProfileList}>*/}
            {/*            /!*<NavLink to="/profile" className={({isActive})=> isActive ? style.active : ""}>*!/*/}
            {/*            <div>*/}
            {/*                <img src={profileAvatar} alt="profileAvatar"/>*/}
            {/*            </div>*/}
            {/*            <p > Profile</p>*/}
            {/*            <p> Profile</p>*/}
            {/*            /!*</NavLink>*!/*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={style.mainProfile}>
                <div className={style.profileWithTable}>
                    <div className={style.profile}>
                        <div className={style.profileInfo}>
                            <div>
                                <img className={style.imagForProfile}
                                     src={profile.avatar || avatar}
                                     alt="avatar"/>
                                <InputTypeFile/>
                            </div>

                            <div className={style.changeInput}>
                                {editMode ?
                                    <input className={error ? style.errorInput : ""}
                                           onChange={onChangeHandler} value={name}
                                           onBlur={onBlurHandler} autoFocus
                                           maxLength={20}
                                           onKeyPress={onKeyPressHandler}
                                    />
                                    :
                                    <p data-tooltip={"Изменить имя"} className={style.nameOfProfile}>{profile.name}
                                        <DriveFileRenameOutlineIcon onClick={editModeHandler}/>

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
                        <Button style={{width: "150px"}} onClick={onClickForMyPacksHandler} variant="outlined">my
                            Packs</Button>
                        <Button style={{width: "150px"}} onClick={onClickForAllHandler} variant="outlined">All
                            Packs</Button>
                    </div>
                </div>
            </div>
        </div>

    );
};
