import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getPacksTC} from "../../../store/packsReducer";

export const EnhancedTable = () => {

    const packs = useAppSelector(state => state.packs.cardPacks);

    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(getPacksTC())

    }, [dispatch])

    if (!packs) {
        return <div><span>LOADING....</span></div>
    }
    return (
        <div>
            <table>
                <thead>
                <th>Name</th>
                <th>Cards</th>
                <th>Last Updated</th>
                <th>Created by</th>
                <th>Actions</th>
                </thead>
                <tbody>
                {packs.map((d) => (
                    <tr key={d._id}>
                        <td>{d.name}</td>
                        <td>{d.cardsCount}</td>
                        <td>{d.updated}</td>
                        <td>{d.user_id}</td>
                        <td>
                        <button></button>
                        <button></button>
                        <button></button>

                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};



