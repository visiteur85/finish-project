import React, {useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {useNavigate, useParams} from "react-router-dom";
import {addNewCardsTC, getCardsTC} from '../../store/cardsReducer';
import {PATH} from "../../App";
import {showPyPacksAC} from "../../store/packsReducer";

export const Cards = React.memo(() => {
    const {id} = useParams<{ id: string }>()
    useEffect(() => {
        if (id) dispatch(getCardsTC(id));}, [id])

    const cards = useAppSelector(state => state.card.cards);
    const packUserId = useAppSelector(state => state.card.packUserId);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user_id = useAppSelector(state => state.profile.profile._id)


    const redirect = () => navigate(PATH.CARDS + `/${packUserId}`)

    const addHandler = () => {
        dispatch(showPyPacksAC(user_id))
        dispatch(addNewCardsTC(packUserId))
        // redirect()
    }

    if (!cards) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div style={{wordBreak: "break-all"}} className='container' >
            <table className="table table-bordered">
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
                            <button onClick={addHandler}>add</button>
                            <button></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
});




