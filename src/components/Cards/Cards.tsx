import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {useNavigate, useParams} from "react-router-dom";
import {deleteCardsTC, getCardsTC} from '../../store/cardsReducer';
import {ModalForNewCards} from "./ModalForNewCards";
import {ModalDelCards} from "./ModalDelCards";
import {ModalChangeCards} from "./ModalChangeNameCards";

export const Cards = React.memo(() => {

    const dispatch = useAppDispatch()

    const {id} = useParams<{ id: string }>()
    useEffect(() => {
            if (id) dispatch(getCardsTC(id));},
        [dispatch, id])

    const cards = useAppSelector(state => state.card.cards);
    // const navigate = useNavigate()
    const userID = useAppSelector(state => state.profile.profile._id);


    // const redirect = () => navigate(PATH.CARDS + `/${packUserId}`)
    const deleteCardsHandler = (packId: string,) => {
        if (id) {
            dispatch(deleteCardsTC(id,packId))
        }
    }


    if (!cards) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <ModalForNewCards/>

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
                            {userID === d.user_id &&
                                <div style={{display: "flex"}}>
                                    <ModalDelCards deleteCardsHandler={deleteCardsHandler} id={d._id} />
                                    <ModalChangeCards _id={d._id}/>
                                </div>
                            }

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    )
});




