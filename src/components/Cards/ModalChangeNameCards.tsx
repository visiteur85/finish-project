import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {ButtonGroup} from "@mui/material";
import style from "../Profile/Profile.module.css";
import {useAppDispatch} from "../../store/store";
import {useParams} from "react-router-dom";
import {BasicModal} from "../modal/BasicModal";
import {updateCardsTC} from "../../store/cardsReducer";


type ModalAddPackPropsType = {
    _id?: string
}

export const ModalChangeCards: React.FC<ModalAddPackPropsType> = props => {
    const {_id} = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const [addValue, setAddValue] = useState<string>('')
    const [addValue2, setAddValue2] = useState<string>('')//
    const [error, SetError] = useState<null | string>(null);

    const changeCards = () => {
        if (_id && id) {
            if (addValue.trim() && addValue2.trim() !== "") {
                dispatch(updateCardsTC(_id, addValue, addValue2, id))
                setAddValue("")
                setAddValue2("")
                setOpen(false)
            } else {
                SetError("Введите текст")
            }
        }
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement> ) => e.key === 'Enter' && changeCards();

    const cancelHandler = () => {
        setOpen(false)
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        SetError(null)
        setAddValue(e.currentTarget.value)
    }
    const onChangeHandler2 = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        SetError(null)
        setAddValue2(e.currentTarget.value)
    }
    return (
        <BasicModal button={"changeNamePack"} open={open} setOpen={setOpen}>
            <div>
                <p>Change name of your cards</p>
                <Button onClick={cancelHandler} variant="text">X</Button>
            </div>
            <TextField
                id="standard-textarea"
                label="Question"
                placeholder="change Question"
                multiline
                variant="standard"
                value={addValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <TextField
                id="standard-textarea"
                label="Answer"
                placeholder="change Answer"
                multiline
                variant="standard"
                value={addValue2}
                onChange={onChangeHandler2}
                onKeyPress={onKeyPressHandler}
            />
            {error && <div className={style.error}>{error}</div>}
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                <Button onClick={changeCards} style={{width: "124px"}}>Send</Button>
            </ButtonGroup>
        </BasicModal>
    );
}

