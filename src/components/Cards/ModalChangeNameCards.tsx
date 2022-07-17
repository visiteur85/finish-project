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
import m from "./ModalForNewCards.module.css";


type ModalAddPackPropsType = {
    _id?: string
    question: string
    answer: string
}

export const ModalChangeCards: React.FC<ModalAddPackPropsType> = props => {
    const {_id, answer, question} = props;
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const [addValue, setAddValue] = useState<string>(question)
    const [addValue2, setAddValue2] = useState<string>(answer)
    const [error, SetError] = useState<null | string>(null);
    const [open, setOpen] = React.useState(false);

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
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && changeCards();

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
            <div className={m.container}>
                <div className={m.x}>
                    <Button onClick={cancelHandler} variant="text">X</Button>
                </div>
                <div>
                    <p className={m.title}>Change name of your cards</p>
                    <div className={m.title}>
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
                    </div>
                    <div className={m.title}>
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
                    </div>
                    <div className={m.title}>
                        {error && <div className={style.error}>{error}</div>}
                    </div>
                    <div className={m.buttons}>
                        <Button onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                        <Button onClick={changeCards} style={{width: "124px"}}>Send</Button>
                    </div>
                </div>
            </div>
        </BasicModal>
    );
}

