import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from '../store/store';
import { NavLink} from "react-router-dom";
import { PATH } from '../App';
import { getPacksTC } from '../store/packsReducer';

export const Packs = () => {
    useEffect(() => {
        dispatch(getPacksTC())
    }, [])
    const packs = useAppSelector(state => state.pack.cardPacksTotalCount);
    const cardPacks = useAppSelector(state => state.pack.cardPacks);
    const dispatch = useAppDispatch()
    
    if (!packs) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <table>
                <thead>
                <th>Name</th>
                <th>Cards</th>
                <th>Last Updated</th>
                <th>Created by</th>
                <th>Actions</th>
                </thead>
                <tbody>
                {cardPacks.map((d) => (
                    <tr key={d._id}>
                       <NavLink to={PATH.CARDS + `/${d._id}`}>
                           <td>{d.name}</td>
                      </NavLink>
                        <td>{d.cardsCount}</td>
                        <td>{d.updated}</td>
                        <td>{d.user_name}</td>
                        <td>
                            <IconButton aria-label="delete" size="small">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                            <button></button>
                            <button></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/*<div>{cardPacks.map(m => {*/}
            {/*    return (<div key={m._id}>{m.name}</div>)*/}
            {/*})}</div>*/}
        </div>
    )
};



