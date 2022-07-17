import * as React from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "./BasicModal";
import TextField from "@mui/material/TextField";
import {ButtonGroup} from "@mui/material";
import {useState} from "react";
import style from "../Profile/Profile.module.css";
import m from "../Cards/ModalForNewCards.module.css";


type ModalAddPackPropsType = {
    changeNamePack: (id: string, name: string) => void
    id: string
    nameOfPack: string
}

export const ModalChangeNamePack: React.FC<ModalAddPackPropsType> = props => {


    const {changeNamePack, id, nameOfPack} = props;

    let [newName, SetNewName] = useState(nameOfPack);
    const [error, SetError] = useState<null | string>(null);
    const [open, setOpen] = React.useState(false);


    const addNewPackHandler = () => {
        if (newName.trim() !== "") {
            changeNamePack(id, newName)
            SetNewName("")
            setOpen(false)
        } else {
            SetError("Введите текст")
        }

    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && addNewPackHandler();

    const onChangeHandler = (e: any) => {
        SetError(null)
        SetNewName(e.currentTarget.value)
    }
    const cancelHandler = () => {
        setOpen(false)
    }

    return (
        <BasicModal button={"changeNamePack"} open={open} setOpen={setOpen}>
            <div className={m.container}>
                <div className={m.x}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <div>
                    <p className={m.title}>Change name of your pack</p>
                </div>
                <div className={m.title}>
                    <TextField
                        id="standard-textarea"
                        label="Name pack"
                        placeholder="Add Name"
                        multiline
                        variant="standard"
                        value={newName}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                    />
                </div>
                <div className={m.title}>
                    {error && <div className={style.error}>{error}</div>}
                </div>
                <div className={m.buttons}>
                    <Button onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                    <Button onClick={addNewPackHandler} style={{width: "124px"}}>Send</Button>
                </div>
            </div>
        </BasicModal>
    );
}

