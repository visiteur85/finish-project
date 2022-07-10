import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {
    changeCountOfRawsAC,
    changeCurrentPageAC,
    getPacksTC,
    sortPacksAc
} from "../../../store/packsReducer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {TablePagination} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {Search} from "../Search/Search";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../App";
import SortIcon from '@mui/icons-material/Sort';
import Button from "@mui/material/Button";


type filtersNamesType = "name" | "updated" | "cardsCount"

export const EnhancedTable = () => {
    const [searchName, setSearchName] = useState<string>('')
    const packs = useAppSelector(state => state.packs.cardPacks);


    const currentPacksPage = useAppSelector(state => state.packs.filterForPacks.page) || 1;
    const packsAllPage = useAppSelector(state => state.packs.cardPacksTotalCount);
    const amountOfRows = useAppSelector(state => state.packs.filterForPacks.pageCount) || 4


    const [filter, setFilter] = useState<Record<filtersNamesType, boolean>>({
        name: false,
        updated: false,
        cardsCount: false
    })


    const dispatch = useAppDispatch();

    const handleChangeRowsPerPage = (e: any) => {
        let value = e.target.value
        dispatch(changeCountOfRawsAC(value))
        dispatch(getPacksTC())
    }

    const handleChangePage = (e: any, value: number) => {
        let currentPage = value
        dispatch(changeCurrentPageAC(currentPage))
        dispatch(getPacksTC())
    }

    const onSortTable = (filterStatus: boolean, filteresNames: filtersNamesType) => {
        filterStatus ? dispatch(sortPacksAc(`0${filteresNames}`)) : dispatch(sortPacksAc(`1${filteresNames}`))
        setFilter({...filter, [filteresNames]: !filterStatus})
        dispatch(getPacksTC())
    }

    // const delRowHandler = (id: string) => {
    //     dispatch(deletePackTC(id))
    // }

    return (
        <div style={{wordBreak: "break-all"}} className='container'>
            <Search searchName={searchName} setSearchName={setSearchName}/>
                    <input type="text"/>
                    <Button variant="outlined">P</Button>
                    <table className="table table-bordered">
                        <thead>
                        <th>Name
                            <SortIcon fontSize={"large"} onClick={() => onSortTable(filter.name, "name")}/>
                        </th>
                        <th>Cards
                            <SortIcon fontSize={"large"} onClick={() => onSortTable(filter.cardsCount, "cardsCount")}/>
                        </th>
                        <th>Last Updated
                            <SortIcon fontSize={"large"} onClick={() => onSortTable(filter.updated, "updated")}/>
                        </th>
                        <th>Created by</th>
                        <th>Actions</th>
                        </thead>
                        <tbody>
                        {packs.map((d) => (
                            <tr key={d._id}>
                                <NavLink to={PATH.CARDS + `/${d._id}`}>
                                    <td>{d.name}</td>
                                </NavLink>
                                <td>{d.cardsCount}</td>
                                <td>{d.updated}</td>
                                <td>{d.user_name}</td>
                                <td>

                                    <IconButton aria-label="delete">
                                        <DeleteIcon
                                            // onClick={() => delRowHandler(d.user_id)}
                                        />
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
                );}




