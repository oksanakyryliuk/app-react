import React from 'react';
import {Button, Container, Stack, TextField} from "@mui/material";
import {useForm} from 'react-hook-form';
import {RegisterDTO} from "../../common/types";
import {useAuth} from "../hooks/useAuth";

export const RegisterPage = () => {
    const {register, handleSubmit, formState: {isValid}} = useForm<RegisterDTO>();
    const {registerUser} = useAuth();
    return (
        <Container maxWidth="xs" sx={{height: '100%'}}>
            <Stack flexDirection="column" alignContent="Center" justifyContent="center" sx={{height: '100%'}}>
                <Stack component="form" flexDirection="column" alignContent="Center" justifyContent="center" spacing={3}
                       onSubmit={handleSubmit(registerUser)}>
                    <TextField label="Email" variant="outlined" autoFocus {...register('email', {required: true})}/>
                    <TextField label="Password" type="password"
                               variant="outlined" {...register('password', {required: true})}/>
                    <TextField label="Name" variant="outlined" {...register('name', {required: true})}/>
                    <Button variant="contained" type="submit" disabled={!isValid}>Register</Button>
                </Stack>
            </Stack>
        </Container>
    )
}

