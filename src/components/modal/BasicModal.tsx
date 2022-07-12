import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {FC, ReactNode, useState, PropsWithChildren, useEffect} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

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
    button: string
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


    return (
        <div>
            {

            button === "justButton" ?
                <Button variant="contained" style={{width: "200px"}} onClick={handleOpen}>New Pack</Button>
                :
                <IconButton onClick={handleOpen} aria-label="delete">
                    <DeleteIcon/>

                </IconButton>}

            {/*<Button variant="contained" style={{width: "200px"}} onClick={handleOpen}>New Pack</Button>*/}

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
