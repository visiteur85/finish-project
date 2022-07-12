import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {ButtonGroup} from "@mui/material";
import {BasicModal} from "../modal/BasicModal";
import {addNewCardsTC} from "../../store/cardsReducer";
import {useAppDispatch} from "../../store/store";
import {useParams} from "react-router-dom";



export const ModalForNewCards = () => {

    const dispatch = useAppDispatch()
    const [addValue, setAddValue] = useState<string>('')
    const [addValue2, setAddValue2] = useState<string>('')//

    const {id} = useParams()

    const addNewCards = () => {
       if(id){
           dispatch(addNewCardsTC(id,addValue,addValue2))
       }
    }

    const onChangeHandler = (e: any) => {
        setAddValue(e.currentTarget.value)
    }
    const onChangeHandler2 = (e: any) => {
        setAddValue2(e.currentTarget.value)
    }

    return (
        <BasicModal>
            <div>
                <p>Add new card</p>
                <Button variant="text">X</Button>
            </div>
            <TextField
                id="standard-textarea"
                label="Question"
                placeholder="Add Name"
                multiline
                variant="standard"
                value={addValue}
                onChange={onChangeHandler}
            />
            <TextField
                id="standard-textarea"
                label="Answer"
                placeholder="Add Name"
                multiline
                variant="standard"
                value={addValue2}
                onChange={onChangeHandler2}
            />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button style={{width: "124px"}}>Cancel</Button>
                <Button onClick={addNewCards} style={{width: "124px"}}>Send</Button>
            </ButtonGroup>
        </BasicModal>
    );
}

