import React from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {registerTC,} from "./authReducer";
import {LoginParamsType} from "../api";
import {useAppDispatch, useAppSelector} from "../../store/store";

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
            } else if (values.password.length<3) {
                errors.password = 'password shout be > 3 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            formik.resetForm()
        },
    })

    // if(isLoggedIn) {
    //     return <Navigate to={'/'}/>
    // }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>

                <h2>it-incubator</h2>
                <p>sign up</p>
                <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <TextField margin="normal"
                                label="Email"
                               {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email &&
                    <div style={{color:"red"}}>{formik.errors.email}</div>}
                    <TextField type="password" label="Password"
                               margin="normal"
                               {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password && formik.touched.email &&
                    <div style={{color:"red"}}>{formik.errors.password}</div>
                    }
                    <TextField type="password" label="Confirm Password"
                               margin="normal"
                               {...formik.getFieldProps('Confirm Password')}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                       Register
                    </Button>
                </FormGroup>
                </form>
            </FormControl>
        </Grid>
 </Grid>
}


