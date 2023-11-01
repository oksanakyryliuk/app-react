import React from 'react';
import {Button, Container, Stack, TextField} from "@mui/material";
import {useForm} from 'react-hook-form';
import {LoginDTO} from "../../common/types";
import {useAuth} from "../hooks/useAuth";

export const LoginPage = () => {
    const {register, handleSubmit, formState: {isValid}} = useForm<LoginDTO>();
    const {login} = useAuth();
    return (
        <Container maxWidth="xs" sx={{height: '100% ', marginTop: '30px',}}>
            <Stack flexDirection="column" alignContent="Center" justifyContent="center" sx={{height: '100%'}}>
                <Stack component="form" flexDirection="column" alignContent="Center" justifyContent="center" spacing={3}
                       onSubmit={handleSubmit(login)}>
                    <TextField label="Email" variant="outlined" autoFocus {...register('email', {required: true})}/>
                    <TextField label="Password" type="password"
                               variant="outlined" {...register('password', {required: true})}/>
                    <Button variant="contained" type="submit" disabled={!isValid}>Login</Button>
                </Stack>
            </Stack>
        </Container>
    )
}