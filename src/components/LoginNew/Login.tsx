import React, {useState} from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {loginTC} from "./authReducer";
import {useAppDispatch, useAppSelector} from "../../store/store";
import log from './Login.module.css'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Navigate} from "react-router-dom";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

// Partial делае все поля необязательными
// Omit убирает одном поле, перечисление через |
// Pick добовляет  поле, перечисление через | .  const errors: Partial<Pick<LoginParamsType, 'email'| 'password' |'rememberMe'>> = {};
export const Login = () => {
    const dispatch = useAppDispatch()
    const [disable, setDisable] = useState<boolean>(false)

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            // const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'password shout be > 8 symbols';
            }
            if (formik.errors.email || formik.errors.password) {
                Object.keys(errors).length === 0 ? setDisable(false) : setDisable(true)
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            setDisable(true)
            formik.resetForm()
        },
    })
        const [value, setValue] = React.useState({
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            showPassword: false,
        });

        const handleClickShowPassword = () => {
            setValue({...value, showPassword: !value.showPassword,
            });
        };
        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };

        // if(isLoggedIn) {
        //     return <Navigate to={'/profile'}/>
        // }

        return (
            <div className={log.container}>
                <div className={log.group}>
                    <FormControl>
                        <FormLabel>
                            <h2>it-incubator</h2>
                            <p>SIGN IN</p>
                        </FormLabel>
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <TextField margin="normal"
                                           label="Email"
                                           {...formik.getFieldProps('email')}
                                />
                                {formik.errors.email && formik.touched.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput label="Password"
                                        type={value.showPassword ? 'text' : 'password'}
                                        {...formik.getFieldProps('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {value.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {formik.errors.password && formik.touched.email &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}

                                <FormControlLabel label={'Remember me'} control=
                                    {<Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps('rememberMe')}
                                    />}/>
                                <Button disabled={disable} type={'submit'} variant={'contained'} color={'primary'}>
                                    Login
                                </Button>
                                <FormLabel>
                                    <p>don't have an an account?</p>
                                    <p>SIGN UP</p>
                                </FormLabel>
                            </FormGroup>
                        </form>
                    </FormControl>
                </div>
                </div>
        )
    }





