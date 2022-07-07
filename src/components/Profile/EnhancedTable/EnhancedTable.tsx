import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getPacksTC} from "../../../store/packsReducer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Fab} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


export const EnhancedTable = () => {

    const packs = useAppSelector(state => state.packs.cardPacks);

    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(getPacksTC())

    }, [dispatch])

    // if (!packs) {
    //     return <div><span>LOADING....</span></div>
    // }
    return (
        <div style={{wordBreak:"break-all"}} className='container'>
            <table  className="table table-bordered">
                <thead>
                <th>Name</th>
                <th>Cards
                </th>
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
                        <td>{d.user_name}</td>
                        <td>

                            {/*<IconButton aria-label="delete">*/}
                            {/*    <DeleteIcon/>*/}
                            {/*</IconButton>*/}

                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};



