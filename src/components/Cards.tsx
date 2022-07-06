import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from '../store/store';
import {NavLink, useParams} from "react-router-dom";
import {PATH} from '../App';
import {getPacksTC} from '../store/packsReducer';
import {getCardsTC} from '../store/cardsReducer';

export const Cards = () => {

    useEffect(() => {
        dispatch(getCardsTC());
    }, [])
    const cards = useAppSelector(state => state.card.cards);
    const dispatch = useAppDispatch()

    if (!cards) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <table>
                <thead>
                <th>Question</th>
                <th>Answer</th>
                <th>Updated</th>
                <th>Grade</th>
                <th>Actions</th>
                </thead>
                <tbody>
                {cards.map((d) => (
                    <tr key={d._id}>
                            <td>{d.question}</td>
                        <td>{d.answer}</td>
                        <td>{d.updated}</td>
                        <td>{d.grade}</td>
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




