import * as React from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "./BasicModal";
import TextField from "@mui/material/TextField";
import {ButtonGroup} from "@mui/material";
import {useState} from "react";
import style from "../Profile/Profile.module.css";
import m from "../Cards/ModalForNewCards.module.css";


type ModalAddPackPropsType = {
    // id: string
    cardsCount:number
    nameOfPack:string

    // name: string
}

export const ModalStartLearn: React.FC<ModalAddPackPropsType> = props => {

    const {cardsCount, nameOfPack} = props;

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
                    <p>{nameOfPack}</p>
                <div>
                    <span>Question:      </span>
                    <span>Name of Question</span>
                </div>

                {/*</div>*/}
                <div className={m.buttons}>
                    <Button  onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                    <Button style={{width: "190px"}} >Show Answer</Button>
                </div>
            </div>
        </BasicModal>
    );
}

