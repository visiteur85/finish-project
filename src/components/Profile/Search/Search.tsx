import React, {ChangeEvent, FC, useState} from 'react';
import {useDispatch} from 'react-redux';
import s from './Search.module.css'
import searchIcon from './image/searchIcon.svg';
import SuperInputText from "./SuperInputText";
import {useParams} from "react-router-dom";
import {getPacksTC, setSearchNamePacksAC} from "../../../store/packsReducer";
import {useAppDispatch} from "../../../store/store";
import {SuperButton} from "../../Test/universalComponents/superButton/SuperButton";

type SearchPropsType = {
    searchName: string
    setSearchName: (value: string) => void
}

export const Search: FC<SearchPropsType> = ({searchName, setSearchName}) => {
    const dispatch = useAppDispatch()

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.currentTarget.value && setSearchName(event.currentTarget.value)
        event.currentTarget.value && dispatch(setSearchNamePacksAC(event.currentTarget.value))
    }

    const onSearchHandler = () => {
        dispatch(getPacksTC())
        // setSearchName('')
    }

    const onKeyPressHandler = (e: any) => e.key === 'Enter' && onSearchHandler();

    return (
        <div className={s.searchBox}>
            <SuperInputText onKeyPress={onKeyPressHandler} onChange={onChangeInputHandler}
                            placeholder={'search packs'} inputClassName={s.search} value={searchName}/>
            <br/>
        </div>
    );
};

