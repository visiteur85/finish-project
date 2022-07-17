import React, {ChangeEvent, useState} from 'react';
import {IconButton} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Vector from '../../style/images/Web app/Vector.png'
import {useAppDispatch} from "../../store/store";
import {changeNameTC} from "../../store/profileReducer";

export const InputTypeFile = React.memo(() => {

    const [ava, setAva] = useState(Vector)
    const [isAvaBroken, setIsAvaBroken] = useState(false)
    const dispatch = useAppDispatch();

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(changeNameTC(file64))
                    // setAva('111')
                })
            } else {
                alert('Файл слишком большого размера')
            }
        }
    }


    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    const errorHandler = () => {
        setIsAvaBroken(true)
        alert('Кривая картинка')
    }

    return (
        <div>
            <img
                src={isAvaBroken ? Vector : ava}
                style={{width: '100px'}}
                onError={errorHandler}
                alt="ava"
            />
            <label>
                <input type="file"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />
                <IconButton component="span">
                    <CloudUploadIcon/>
                </IconButton>
            </label>
        </div>
    )
})

function changeName(file64: string) {
    throw new Error('Function not implemented.');
}
