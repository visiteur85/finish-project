import React, {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../store/store";
import log from './../Login/Login.module.css'
import {Navigate} from "react-router-dom";
import {FormikErrorType} from "../Registartion/Registration";
import styleContainer from "../../style/Container.module.css"
import {sendEmailTC} from '../../store/forgotPasReducer';
import { NavLink } from 'react-router-dom';


export const ForgotPass = () => {
    const dispatch = useAppDispatch()
    const [disable, setDisable] = useState<boolean>(false)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: Partial<FormikErrorType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(sendEmailTC(values))
            setDisable(true)
        },
    })
    
    if(isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={styleContainer.container}>
            <div className={log.container}>
                <div className={log.group}>
                    <FormControl>
                        <FormLabel>
                            <h2>it-incubator</h2>
                            <p>Forgot you password?</p>
                        </FormLabel>
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <TextField margin="normal"
                                           label="Email"
                                           {...formik.getFieldProps('email')}
                                />
                                {formik.errors.email && formik.touched.email &&
                                    <div style={{color: "red"}}>{formik.errors.email}</div>}
                                <FormLabel>
                                    <p>Enter your email address and we will send you further instructions</p>
                                </FormLabel>
                                <Button disabled={disable} type={'submit'} variant={'contained'} color={'primary'}>
                                    Send Instructions
                                </Button>
                            </FormGroup>
                        </form>
                        <FormLabel>
                            <p>Did you remember your password?</p>
                            <NavLink to={'/login'}>Try logging in</NavLink>
                        </FormLabel>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

