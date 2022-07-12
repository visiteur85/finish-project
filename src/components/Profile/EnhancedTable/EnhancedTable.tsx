import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {
    addNewPackTS,
    changeCountOfRawsAC,
    changeCurrentPageAC,
    changePackTC,
    deletePackTC,
    getPacksTC,
    sortPacksAc
} from "../../../store/packsReducer";
import {TablePagination} from "@mui/material";
import {Search} from "../Search/Search";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../App";
import SortIcon from '@mui/icons-material/Sort';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import style from "../EnhancedTable/EnhancedTable.module.css"
import {ModalAddPack} from "../../modal/ModalAddPack";
import {ModalDelPack} from "../../modal/ModalDelPack";


type filtersNamesType = "name" | "updated" | "cardsCount"

export const EnhancedTable = () => {
    const [searchName, setSearchName] = useState<string>('')
    const packs = useAppSelector(state => state.packs.cardPacks);
    const packUserId = useAppSelector(state => state.card.packUserId);

    const currentPacksPage = useAppSelector(state => state.packs.filterForPacks.page) || 1;
    const packsAllPage = useAppSelector(state => state.packs.cardPacksTotalCount);
    const amountOfRows = useAppSelector(state => state.packs.filterForPacks.pageCount) || 4;
    const userID = useAppSelector(state => state.profile.profile._id);




//type filtersNamesType = "name" | "updated" | "cardsCount"
    const [filter, setFilter] = useState<Record<filtersNamesType, boolean>>({
        name: false,
        updated: false,
        cardsCount: false
    })
    const user_id = useAppSelector(state => state.profile.profile._id)

    const dispatch = useAppDispatch();

    const addNewPack = (newName:string) => {
    dispatch(addNewPackTS(newName))
    }

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
    };

    const delPack = (id: string) => {
        dispatch(deletePackTC(id));
    }
    const changePack = (id: string) => {
        dispatch(changePackTC(id));
    }

    return (
        <div style={{wordBreak: "break-all"}} className='container'>
            <div className={style.headerForTableWithModale}>
            <Search searchName={searchName} setSearchName={setSearchName}/>
                <ModalAddPack addNewPack={addNewPack}/>

        </div>

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

                                    {userID === d.user_id &&
                                        <div>
                                            <ModalDelPack delPack={delPack} id={d._id} name={d.name}/>
                                            <DriveFileRenameOutlineIcon onClick={() => changePack(d._id)}/>
                                        </div>
                                      }
                                    {/*{userID === d.user_id && <ModalDelPack delPack={delPack} id={d._id}/>}*/}

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




