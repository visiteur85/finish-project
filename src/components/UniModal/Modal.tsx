import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FC, ReactNode} from "react";
import {BasicModal} from "./UniModal";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Modal1 = () => {


    return (
        <BasicModal>
            <h1>you</h1>
            <h2>oasdasdasd</h2>

        </BasicModal>
    );
}
