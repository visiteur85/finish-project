import React from 'react'
import Grid from '@mui/material/Grid';
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

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

// Partial делае все поля необязательными
// Omit убирает одном поле, перечисление через |
// Pick добовляет  поле, перечисление через | .  const errors: Partial<Pick<LoginParamsType, 'email'| 'password' |'rememberMe'>> = {};
export const Login = () => {
    const dispatch=useAppDispatch()
    const isLoggedIn=useAppSelector(state => state.auth.isLoggedIn)
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
            } else if (values.password.length<8) {
                errors.password = 'password shout be > 8 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    // if(isLoggedIn) {
    //     return <Navigate to={'/'}/>
    // }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
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
                    <div style={{color:"red"}}>{formik.errors.email}</div>}
                    <TextField type="password" label="Password"
                               margin="normal" autoComplete='current-password'
                               {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password && formik.touched.email &&
                    <div style={{color:"red"}}>{formik.errors.password}</div>}

                    <FormControlLabel label={'Remember me'} control=
                        {<Checkbox
                             checked={formik.values.rememberMe}
                            {...formik.getFieldProps('rememberMe')}
                            />}/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                    <FormLabel>
                        <p>don't have an an account?</p>
                        <p>SIGN UP</p>
                    </FormLabel>
                </FormGroup>
                </form>
            </FormControl>
        </Grid>
 </Grid>
}


