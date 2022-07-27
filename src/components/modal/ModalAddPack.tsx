import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "./BasicModal";
import TextField from "@mui/material/TextField";
import style from "../Profile/Profile.module.css";
import m from "./../Cards/ModalForNewCards.module.css";
import Checkbox from '@mui/material/Checkbox';
import {setPrivatePacksAC} from "../../store/packsReducer";
import {useAppDispatch, useAppSelector} from "../../store/store";


type ModalAddPackPropsType = {
    addNewPack: (newName: string,privatePacks:boolean) => void
}

export const ModalAddPack: React.FC<ModalAddPackPropsType> = props => {

    const {addNewPack} = props;

    const privatePacks = useAppSelector(state => state.packs.filterForPacks.private);

    const [newName, SetNewName] = useState("");
    const [error, SetError] = useState<null | string>(null);
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch()

    const addNewPackHandler = () => {
        if (newName.trim() !== "") {
                addNewPack(newName, privatePacks!)
            SetNewName("")
            setOpen(false)
        } else {
            SetError("Введите текст")
        }

    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && addNewPackHandler();

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        SetError(null)
        SetNewName(e.currentTarget.value)
    }
    const cancelHandler = () => {
        setOpen(false)
    }

    const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(setPrivatePacksAC(newIsDoneValue))
    }

    return (
        <BasicModal button={"justButton"} open={open} setOpen={setOpen}>
            <div className={m.container}>
                <div className={m.x}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <p className={m.title}>Add new pack</p>
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
            <div className={m.title}>
                <Checkbox
                    checked={privatePacks}
                    color="primary"
                    onChange={onChangeHandlerStatus}
                />
                <span>private packs</span>
            </div>
            <Button style={{width: "200px"}} variant="contained">add new cover</Button>
            <div className={m.buttons}>
                <Button onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                <Button onClick={addNewPackHandler} style={{width: "124px"}}>Send</Button>
            </div>
        </BasicModal>
    );
}

