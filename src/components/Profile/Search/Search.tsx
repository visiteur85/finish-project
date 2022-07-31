import React, {ChangeEvent, FC} from 'react';
import {getPacksTC, setSearchNamePacksAC} from "../../../store/packsReducer";
import {useAppDispatch} from "../../../store/store";
import {Paper} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

type SearchPropsType = {
    searchName: string
    setSearchName: (value: string) => void
}

export const Search: FC<SearchPropsType> = ({searchName, setSearchName}) => {

    const dispatch = useAppDispatch()

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.currentTarget.value)
        dispatch(setSearchNamePacksAC(event.currentTarget.value))
    }

    const onSearchHandler = () => {
        dispatch(getPacksTC())
        setSearchName('')
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && onSearchHandler();

    return (
        <div>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 400,
                    border: "solid  1px #635D80",
                    marginBottom: "20px",
                    backgroundColor: "#ECECF9"
                }}
            >
                <IconButton type="submit" sx={{p: '10px'}} aria-label="search" onClick={onSearchHandler}>
                    <SearchIcon/>
                </IconButton>
                <InputBase
                    onKeyPress={onKeyPressHandler}
                    onChange={onChangeInputHandler}
                    value={searchName}
                    sx={{ml: 1, flex: 1}}
                    placeholder="Search... "
                    inputProps={{'aria-label': 'search google maps'}}
                />
                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
            </Paper>
        </div>
    );
};

