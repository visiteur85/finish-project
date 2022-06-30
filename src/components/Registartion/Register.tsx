import React, {useState} from 'react'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {registerTC,} from "../LoginNew/authReducer";
import {LoginParamsType} from "../api";
import {useAppDispatch, useAppSelector} from "../../store/store";
import reg from "./Register.module.css";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormLabel from '@mui/material/FormLabel';
import { Navigate } from 'react-router-dom';


type  FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

// Partial делае все поля необязательными
// Omit убирает одном поле, перечисление через |
// Pick добовляет  поле, перечисление через | .  const errors: Partial<Pick<LoginParamsType, 'email'| 'password' |'rememberMe'>> = {};
export const Register = () => {
    const [disable, setDisable] = useState<boolean>(false)

    const dispatch=useAppDispatch()
    const isLoggedIn=useAppSelector(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword:'',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length<8) {
                errors.password = 'password shout be > 8 symbols';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Password is required';
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords are not equal';
            }
            if (formik.errors.email || formik.errors.password || formik.errors.confirmPassword) {
                Object.keys(errors).length === 0 ? setDisable(false) : setDisable(true)
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            setDisable(true)
            formik.resetForm()
        },
    })
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword,});
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if(isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }


    return (
        <div className={reg.container}>
            <div className={reg.group}>
                <FormControl>
                    <FormLabel>
                    <h2>it-incubator</h2>
                    <p>sign up</p>
                    </FormLabel>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField margin="normal"
                                       label="Email"
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email && formik.touched.email &&
                            <div style={{color:"red"}}>{formik.errors.email}</div>}
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput label="Password"
                                               type={values.showPassword ? 'text' : 'password'}
                                               {...formik.getFieldProps('password')}
                                               endAdornment={
                                                   <InputAdornment position="end">
                                                       <IconButton
                                                           aria-label="toggle password visibility"
                                                           onClick={handleClickShowPassword}
                                                           onMouseDown={handleMouseDownPassword}
                                                           edge="end"
                                                       >
                                                           {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               }
                                />
                            </FormControl>
                            {formik.errors.password && formik.touched.email &&
                            <div style={{color:"red"}}>{formik.errors.password}</div>
                            }
                            <FormControl variant="outlined" className={reg.confirmPass}>
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput label="Confirm Password"
                                               type={values.showPassword ? 'text' : 'password'}
                                               {...formik.getFieldProps('Confirm Password')}
                                               endAdornment={
                                                   <InputAdornment position="end">
                                                       <IconButton
                                                           aria-label="toggle password visibility"
                                                           onClick={handleClickShowPassword}
                                                           onMouseDown={handleMouseDownPassword}
                                                           edge="end"
                                                       >
                                                           {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               }
                                />
                            </FormControl>
                            {formik.errors.password && formik.touched.email &&
                            <div style={{color:"red"}}>{formik.errors.password}</div>}
                            <Button disabled={disable} type={'submit'} variant={'contained'} color={'primary'}>
                                Register
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </div>
            </div>
        )
}


