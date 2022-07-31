import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {
    addNewPackTS,
    changeCountOfRawsAC,
    changeCurrentPageAC, changePackTC, deletePackTC,
    getPacksTC, setSearchNamePacksAC,
    sortPacksAc
} from "../../../store/packsReducer";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {Search} from "../Search/Search";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../App";
import SortIcon from '@mui/icons-material/Sort';
import style from "../EnhancedTable/EnhancedTable.module.css"
import {ModalAddPack} from "../../modal/addNewpack/ModalAddPack";
import {ModalDelPack} from "../../modal/ModalDelPack";
import {ModalChangeNamePack} from "../../modal/ModalChangeNamePack";

import {ModalStartLearn} from "../../modal/Learn/ModalStartLearn";
import cover from "../../../style/images/branding_logo.png"
import TextField from '@material-ui/core/TextField/TextField';


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

    const addNewPack = (newName: string, privatePacks: boolean,file:string) => {
        dispatch(addNewPackTS(newName, privatePacks,file))
    }

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(changeCountOfRawsAC(+e.target.value))
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
    const changePack = (id: string, name: string,file:string) => {
        dispatch(changePackTC(id, name,file));
    }


    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.currentTarget.value && setSearchName(event.currentTarget.value)
        event.currentTarget.value && dispatch(setSearchNamePacksAC(event.currentTarget.value))
    }

    const onSearchHandler = () => {
        dispatch(getPacksTC())
        setSearchName('')
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && onSearchHandler();
    return (
        <div>
            <div className={style.headerForTableWithModale}>
                {/*<TextField*/}
                {/*    onKeyPress={onKeyPressHandler}*/}
                {/*    onChange={onChangeInputHandler}*/}
                {/*    placeholder={'search packs'}*/}
                {/*    value={searchName}*/}
                {/*/>*/}
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
                                    <img width={40} height={40} src={row.deckCover || cover} alt=""/>
                                </TableCell>
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




