import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {deleteCardsTC, getCardsTC} from '../../store/cardsReducer';
import {ModalForNewCards} from "./ModalForNewCards";
import {ModalDelCards} from "./ModalDelCards";
import {ModalChangeCards} from "./ModalChangeNameCards";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import {PATH} from "../../App";
import {ModalDelPack} from "../modal/ModalDelPack";
import {ModalChangeNamePack} from "../modal/ModalChangeNamePack";

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

        <div>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell align="left">Answer</TableCell>
                            <TableCell align="center"> Updated</TableCell>
                            <TableCell align="right">Grade</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                                <TableCell align="left">{row.question}</TableCell>
                                <TableCell align="left">{row.answer}</TableCell>
                                <TableCell align="right">{row.updated}</TableCell>
                                <TableCell align="right">{row.grade}</TableCell>
                                <TableCell align="right">
                                    {userID === row.user_id &&
                                        <div style={{display: "flex"}}>
                                            <ModalDelCards deleteCardsHandler={deleteCardsHandler} id={row._id} />
                                            <ModalChangeCards _id={row._id}/>
                                        </div>
                                    }
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </div>
    )
});




