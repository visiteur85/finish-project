import * as React from 'react';
import Button from '@mui/material/Button';
import {BasicModal} from "./BasicModal";
import TextField from "@mui/material/TextField";
import {ButtonGroup} from "@mui/material";
import {useState} from "react";


type ModalAddPackPropsType = {
    addNewPack: (newName: string) => void
}

export const ModalAddPack: React.FC<ModalAddPackPropsType> = props => {
    const {
        addNewPack
    } = props;

    let [newName, SetNewName] = useState("")


    const addNewPackHandler = () => {
        addNewPack(newName)
        SetNewName("")
    }

    const onChangeHandler = (e: any) => {
        SetNewName(e.currentTarget.value)
    }


    return (
        <BasicModal>
            <div>
                <p>Add new pack</p>
                <Button variant="text">X</Button>
            </div>
            <TextField
                id="standard-textarea"
                label="Name pack"
                placeholder="Add Name"
                multiline
                variant="standard"
                value={newName}
                onChange={onChangeHandler}
            />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button style={{width: "124px"}}>Cancel</Button>
                <Button onClick={addNewPackHandler} style={{width: "124px"}}>Send</Button>

            </ButtonGroup>
        </BasicModal>
    );
}

