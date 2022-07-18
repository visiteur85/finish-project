import * as React from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "./BasicModal";
import TextField from "@mui/material/TextField";
import {ButtonGroup} from "@mui/material";
import {useState} from "react";
import style from "../Profile/Profile.module.css";
import m from "../Cards/ModalForNewCards.module.css";


type ModalAddPackPropsType = {
    id: string
    delPack: (id: string) => void
    name: string
}

export const ModalDelPack: React.FC<ModalAddPackPropsType> = props => {

    const {id, delPack, name} = props;

    const [open, setOpen] = React.useState(false);

    const delPackHandler = () => {
        delPack(id)
        setOpen(false)
    }
    const cancelHandler = () => {
        setOpen(false)
    }

    return (
        <BasicModal button={"delButton"} open={open} setOpen={setOpen}>
            <div className={m.container}>
                <div className={m.x}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                {/*<div className={m.title}>*/}
                    <h5 className={m.title}>Delete Pack</h5>
                    <p className={m.title}>Do you really want to remove Pack Name - <b>{name}</b>?
                        All cards will be excluded from this course.</p>
                {/*</div>*/}
                <div className={m.buttons}>
                    <Button onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                    <Button onClick={delPackHandler} style={{width: "124px"}}>Delete</Button>
                </div>
            </div>
        </BasicModal>
    );
}

