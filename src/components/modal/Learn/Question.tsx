import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getCardsTC} from "../../../store/cardsReducer";
import {CardsType} from "../../api/cardsApi";
import Button from "@mui/material/Button";
import m from "../../Cards/ModalForNewCards.module.css";

type QuestionPropsType = {
    packId: string
    cancelHandler:()=>void
    cardsCount: number
}

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: CardsType[]): CardsType => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const Question: React.FC<QuestionPropsType> = props => {
    const dispatch = useAppDispatch();
    const {packId, cancelHandler, cardsCount} = props;
    const cards = useAppSelector(state => state.card.cards);
    const [open, setOpen] = React.useState(false);


    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [random, setRandom] = useState<CardsType | null>(null);

    useEffect(() => {
        if (cards) {
            setRandom(getCard(cards))
        }
    }, [cards])

    useEffect(() => {
        dispatch(getCardsTC(packId))

    }, [])

    const onNext = () => {
        setIsChecked(false);
        if (cards.length > 0) {
            setRandom(getCard(cards));
        }
    }
    const cancelHandlerFrom = () => {
        cancelHandler()
    }

    const getAnswerNumber = (i:any)=> {
        console.log(i)
    }
    return (
        <div >
            {random && random.question}
            {/*<div>*/}
            {/*    <Button onClick={() => setIsChecked(true)}>check</Button>*/}
            {/*</div>*/}
            {isChecked && (
                <div style={{marginTop:"30px"}}>
                    <div style={{fontWeight:"normal"}}><span style={{fontWeight:"bold"}}>Answer:</span>{random && random.answer}</div>

                    {grades.map((g, i) => (
                        <div >
                        <Button style={{width:"auto"}}  key={'grade-' + i} onClick={()=>getAnswerNumber(i)}>{g}</Button></div>
                    ))}

                    <div><Button style={{border:"1px solid red"}} onClick={onNext}>next</Button></div>
                </div>
            )}
            <div className={m.buttons}>
                <Button onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                <Button onClick={() => setIsChecked(true)} style={{width: "190px"}}>Show Answer</Button>
            </div>
        </div>
    );
};

