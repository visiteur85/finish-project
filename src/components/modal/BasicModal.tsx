import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {FC, ReactNode, useState, PropsWithChildren, useEffect} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export type ButtonsForModalType = "justButton" | "delButton" | "changeNamePack"
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


type PropsType = {
    button: ButtonsForModalType
    open: boolean
    setOpen: (value: boolean) => void

}
export const BasicModal: FC<PropsWithChildren<PropsType>> = (props) => {
    const {
        children, open, setOpen, button
    } = props

    // const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let changeButton;
    if (button === "justButton") {
        changeButton = <Button variant="contained" style={{width: "200px"}} onClick={handleOpen}>New Pack</Button>
    }
    else if (button === "delButton") {
        changeButton = <IconButton onClick={handleOpen} aria-label="delete">
            <DeleteIcon/>
        </IconButton>
    }
    else if (button === "changeNamePack") {
        changeButton = <DriveFileRenameOutlineIcon onClick={handleOpen}/>
    }
    return (
        <div>
            {changeButton}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
