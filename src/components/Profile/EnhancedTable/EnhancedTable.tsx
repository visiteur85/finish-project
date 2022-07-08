import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {changeCountOfRawsAC, changeCurrentPageAC, getPacksTC} from "../../../store/packsReducer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Fab, Pagination, TablePagination} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


export const EnhancedTable = () => {

    const packs = useAppSelector(state => state.packs.cardPacks);

    const currentPacksPage = useAppSelector(state => state.packs.filterForPacks.page) || 1 ;
    const packsAllPage = useAppSelector(state => state.packs.cardPacksTotalCount);
    const amountOfRows = useAppSelector(state => state.packs.filterForPacks.pageCount) as number



    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(getPacksTC())

    }, [amountOfRows, currentPacksPage ])

    // if (!packs) {
    //     return <div><span>LOADING....</span></div>
    // }
    const handleChangeRowsPerPage = (e:any) => {
        let value = e.target.value
        dispatch(changeCountOfRawsAC(value))
    }

    const handleChangePage = (e:any, value:number) => {
      let currentPage = value
        dispatch(changeCurrentPageAC(currentPage))
    }

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

                            <IconButton aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>

                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            <TablePagination
                component="div"
                count={packsAllPage}
                page={currentPacksPage}
                onPageChange={handleChangePage}
                rowsPerPage={amountOfRows}
                onRowsPerPageChange={handleChangeRowsPerPage}

            />
        </div>
    );
};



