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
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import DirectionsIcon from "@mui/icons-material/Directions";
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';

type filtersNamesType = "name" | "updated" | "cardsCount"

export const EnhancedTable = () => {
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

    return (
        <div>
            <div className={style.headerForTableWithModale}>

                <Search/>

                <ModalAddPack addNewPack={addNewPack}/>

            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead style={{backgroundColor:'#ECECF9'}}>
                        <TableRow>
                            <TableCell>Cover
                            </TableCell>
                            <TableCell>Name
                                <ArrowDropDownSharpIcon fontSize={"medium"} onClick={() => onSortTable(filter.name, "name")}/>
                            </TableCell>
                            <TableCell align="right">Cards
                                <ArrowDropDownSharpIcon fontSize={"medium"}
                                          onClick={() => onSortTable(filter.cardsCount, "cardsCount")}/>
                            </TableCell>
                            <TableCell align="center">Last Updated
                                <ArrowDropDownSharpIcon fontSize={"medium"} onClick={() => onSortTable(filter.updated, "updated")}/>
                            </TableCell>
                            <TableCell align="right">Created by</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs.map((row) => (
                            <TableRow
                                key={row._id}
                                // tr:nth-child(old) tr:nth-child(2n+1)
                                // sx={{
                                //     p: '2px 4px',
                                //     display: 'flex',
                                //     alignItems: 'center',
                                //     width: 400,
                                //     border: error ? "solid  2px red" : "solid  1px #635D80",
                                //     marginBottom: "20px",
                                //     backgroundColor: "#ECECF9"
                                // }}
                                // sx={{
                                //     '&:last-child td, &:last-child th, &:nth-child(old) th ,&:nth-child(old) td': {
                                //         border: 0,
                                //         backgroundColor: '#F8F7FD'}
                                // }
                                sx={{
                                    '&:last-child td, &:last-child th, &:nth-child(old) th ,&:nth-child(old) td': {
                                        border: 0,
                                            backgroundColor: '#F8F7FD'}
                                }
                                }>
                                <TableCell style={{height:"40px", boxSizing:"content-box"}} align="center">
                                    <img width={30} height={30} src={row.deckCover || cover} alt=""/>
                                </TableCell>
                                <NavLink to={PATH.CARDS + `/${row._id}`}>
                                    <TableCell style={{height:"40px", boxSizing:"content-box"}} align="center">{row.name}</TableCell>
                                </NavLink>
                                <TableCell style={{height:"40px", boxSizing:"content-box" }} align="center">{row.cardsCount}</TableCell>
                                <TableCell style={{height:"40px", boxSizing:"content-box"}} align="center">{row.updated.toString().slice(2, 10)}</TableCell>
                                <TableCell style={{height:"40px", boxSizing:"content-box"}} align="center">{row.user_name}</TableCell>
                                <TableCell  style={{display: "flex", height:"40px", boxSizing:"content-box"}} align="center">
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




