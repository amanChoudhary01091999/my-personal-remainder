import React from 'react'
import './login.css'
import Paper from '@mui/material/Paper';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userForgotPasswordRquest, userLoginRquest, userSignupRequest } from './state/axtions';
import { useNavigate } from 'react-router-dom';
import { userForgotPassword } from './state/api';
import { showMessage } from '../../misc';


const paperStyle = {
    my: 4,
    border: true,
    borderRadius: 3,
    padding: 4,
};




const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [dialogStats, setDialoStats] = React.useState(false)
    const { reset, setValue, control, handleSubmit } = useForm({ defaultValues: {} });
    const [login, setLogin] = React.useState(true)
    const OnSubmit = (data) => {
        const payload = {

            data: {
                email: data.email,
                password: data.password,
            },
            navigate: () => navigate("/dashboard", { replace: true })


        }
        // dispatch(userSignupRequest(payload))
        dispatch(login ? userLoginRquest(payload) : userSignupRequest(payload))

    }

    const forgotPasswordInputRef = React.useRef()

    const forgotPassWordClick = () => {
        setDialoStats(!dialogStats)

    }
    const handleTextFieldChange = (e) => {

        forgotPasswordInputRef.current = e.target.value

    }

    const onForgotPasswordSubmit = async () => {
        const payload = { email: forgotPasswordInputRef.current }
        const data = await userForgotPassword(payload)
        if (data) {
            document.getElementById('forgotPasswordSuccessSpan').innerHTML = 'PASSWORD REQUEST SENT TO YOUR REGISTED DATA'

        } else {
            document.getElementById('forgotPasswordSuccessSpan').innerHTML = 'SOMETHING WRONG HAAPENED'

        }
    }

    return (
        <>
            <div className="container">
                <div className="centered-div">
                    <div class="background">
                        <div class="shape"></div>
                        <div class="shape"></div>
                    </div>
                    <form onSubmit={handleSubmit(OnSubmit)}>
                        <label for="username">Username</label>
                        <Controller
                            name={'email'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <input
                                    {...field}
                                    variant="outlined"
                                    placeholder="Email or Phone"
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
                                    id="email"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    autoComplete='off'
                                    sx={{ height: '40px' }}
                                />
                            )}
                            rules={{ required: `Required` }}
                        />

                        <label for="password">Password</label>
                        <Controller
                            name={'password'}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <input
                                    {...field}
                                    variant="outlined"
                                    placeholder="Password"
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
                                    id="password"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    autoComplete='off'
                                    sx={{ height: '40px' }}
                                />
                            )}
                            rules={{ required: `Required` }}
                        />

                        <Button onClick={() => forgotPassWordClick()}>Forgot Password?</Button>

                        <button type='submit' >{login ? "Login" : 'Signup'}</button>
                        <p>OR</p>
                        <p className='sign_up_p' onClick={() => setLogin(!login)}>{!login ? "Login" : 'Signup'}</p>
                    </form>
                </div>
                <Dialog open={dialogStats} fullWidth>
                    <DialogContentText>Enter Your Email for the changing password</DialogContentText>
                    <DialogContent>
                        <TextField variant='outlined' onChange={(e) => handleTextFieldChange(e)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialoStats(false)}>Cancel</Button>
                        <Button onClick={() => onForgotPasswordSubmit()}>Send</Button>
                    </DialogActions>
                    <p id='forgotPasswordSuccessSpan'></p>
                </Dialog>
            </div>

        </>
    )
}

export default Login