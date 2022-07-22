import * as React from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "../BasicModal";
import TextField from "@mui/material/TextField";
import {ButtonGroup} from "@mui/material";
import {useState} from "react";
import style from "../../Profile/Profile.module.css";
import m from "../../Cards/ModalForNewCards.module.css";
import {Question} from "./Question";


type ModalAddPackPropsType = {
    // id: string
    cardsCount:number
    nameOfPack:string
    packId:string

    // name: string
}

export const ModalStartLearn: React.FC<ModalAddPackPropsType> = props => {

    const {cardsCount, nameOfPack, packId} = props;

    const [open, setOpen] = React.useState(false);


    const cancelHandler = () => {
        setOpen(false)
    }

    return (
        <BasicModal cardsCount={cardsCount} button={"startLearn"} open={open} setOpen={setOpen}>
            <div className={m.container}>
                <div className={m.x}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                {/*<div className={m.title}>*/}
                    <h4 className={m.title}>Learn</h4>
                    <p>{nameOfPack}:</p>
                <div style={{display:"flex"}}>
                    <strong><span>Question:</span></strong>
                    <span><Question cancelHandler={cancelHandler}  packId={packId} cardsCount = {cardsCount}/></span>
                </div>

                {/*</div>*/}

            </div>
        </BasicModal>
    );
}

