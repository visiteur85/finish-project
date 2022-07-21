import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getCardsTC} from "../../../store/cardsReducer";

type QuestionPropsType = {

    packId:string

}

export const Question: React.FC<QuestionPropsType> = props =>{
    const dispatch = useAppDispatch();
    const {packId} = props;

    const cards = useAppSelector(state => state.card.cards) ;

    useEffect(()=>{
        dispatch(getCardsTC(packId))

    },[])






    return (
        <div>

            {cards && cards[1].question}
        </div>
    );
};

