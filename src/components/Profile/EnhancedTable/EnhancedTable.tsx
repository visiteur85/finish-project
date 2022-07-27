import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {
    addNewPackTS,
    changeCountOfRawsAC,
    changeCurrentPageAC, changePackTC, deletePackTC,
    getPacksTC,
    sortPacksAc
} from "../../../store/packsReducer";

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";

import {Search} from "../Search/Search";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../App";
import SortIcon from '@mui/icons-material/Sort';
import style from "../EnhancedTable/EnhancedTable.module.css"
import {ModalAddPack} from "../../modal/ModalAddPack";
import {ModalDelPack} from "../../modal/ModalDelPack";
import {ModalChangeNamePack} from "../../modal/ModalChangeNamePack";

import {ModalStartLearn} from "../../modal/Learn/ModalStartLearn";


type filtersNamesType = "name" | "updated" | "cardsCount"

export const EnhancedTable = () => {
    const [searchName, setSearchName] = useState<string>('')
    const packs = useAppSelector(state => state.packs.cardPacks);
    const currentPacksPage = useAppSelector(state => state.packs.filterForPacks.page) || 1;
    const packsAllPage = useAppSelector(state => state.packs.cardPacksTotalCount);
    const amountOfRows = useAppSelector(state => state.packs.filterForPacks.pageCount) || 4;
    const userID = useAppSelector(state => state.profile.profile._id);


    const [filter, setFilter] = useState<Record<filtersNamesType, boolean>>({
        name: false,
        updated: false,
        cardsCount: false
    })

    const dispatch = useAppDispatch();

    const addNewPack = (newName: string, privatePacks: boolean) => {
        dispatch(addNewPackTS(newName, privatePacks))
    }

    const handleChangeRowsPerPage = (e: any) => {
        let value = e.target.value
        dispatch(changeCountOfRawsAC(value))
        dispatch(getPacksTC())
    }

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
        dispatch(changeCurrentPageAC(value))
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
    const changePack = (id: string, name: string) => {
        dispatch(changePackTC(id, name));
    }

    return (
        <div>
            <div className={style.headerForTableWithModale}>
                <Search searchName={searchName} setSearchName={setSearchName}/>
                <ModalAddPack addNewPack={addNewPack}/>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Cover
                            </TableCell>
                            <TableCell>Name
                                <SortIcon fontSize={"large"} onClick={() => onSortTable(filter.name, "name")}/>
                            </TableCell>
                            <TableCell align="right">Cards
                                <SortIcon fontSize={"large"}
                                          onClick={() => onSortTable(filter.cardsCount, "cardsCount")}/>
                            </TableCell>
                            <TableCell align="center">Last Updated
                                <SortIcon fontSize={"large"} onClick={() => onSortTable(filter.updated, "updated")}/>
                            </TableCell>
                            <TableCell align="right">Created by</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell align="center">
                                    <img src="https://chocoradio.ru/upload/resize_cache/iblock/46f/622_622_240cd750bba9870f18aada2478b24840a/46f23d2cb7d461530918c85c0bc67e5f.jpg"
                                         alt="new cover" width="25px" height="25px"/></TableCell>
                                <NavLink to={PATH.CARDS + `/${row._id}`}>
                                    <TableCell align="center">{row.name}</TableCell>
                                </NavLink>
                                <TableCell align="center">{row.cardsCount}</TableCell>
                                <TableCell align="center">{row.updated.toString().slice(2, 10)}</TableCell>
                                <TableCell align="center">{row.user_name}</TableCell>
                                <TableCell style={{display: "flex"}} align="center">
                                    {userID === row.user_id &&
                                        <div style={{display: "flex"}}>
                                            <ModalDelPack delPack={delPack} id={row._id} name={row.name}/>
                                            <ModalChangeNamePack changeNamePack={changePack} id={row._id}
                                                                 nameOfPack={row.name}/>
                                        </div>}

                                    <ModalStartLearn packId={row._id} nameOfPack={row.name}
                                                     cardsCount={row.cardsCount}/>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                {packs.length === 0 && <span style={{color: "red"}}>nothing found</span>}
            </div>
            <TablePagination
                onClick={() => {
                    window.scrollTo({top: 0, behavior: 'smooth'})
                }}
                component="div"
                count={packsAllPage}
                page={currentPacksPage}
                onPageChange={handleChangePage}
                rowsPerPage={amountOfRows}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}




