import React from 'react'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {registerTC,} from "./authReducer";
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


// type FormikErrorType = {
//     email?: string
//     password?: string
//     rememberMe?: boolean
// }

// Partial делае все поля необязательными
// Omit убирает одном поле, перечисление через |
// Pick добовляет  поле, перечисление через | .  const errors: Partial<Pick<LoginParamsType, 'email'| 'password' |'rememberMe'>> = {};
export const Register = () => {
    const dispatch=useAppDispatch()
    const isLoggedIn=useAppSelector(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            // const errors: FormikErrorType = {};
             const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {};
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
            return errors;
        },
        onSubmit: values => {
            dispatch(registerTC(values))
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
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    // if(isLoggedIn) {
    //     return <Navigate to={'/'}/>
    // }

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
                            <div style={{color:"red"}}>{formik.errors.password}</div>
                            }
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Register
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </div>
            </div>
        )
}


