// @ts-ignore

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {LoginDTO, ResetPasswordDTO, ResetPasswordUserDTO} from "../common/types";
import {useAuth} from "../auth/hooks/useAuth";
import {Button, Container, Stack, TextField} from "@mui/material";
import {useForm} from 'react-hook-form';

export function ResetPage() {
    const { token} = useParams();
    const { userEmail} = useParams();
    // const {register, handleSubmit, formState: {isValid}} = useForm<ResetPasswordUserDTO>();
    const {resetPassword} = useAuth();

    const { register, handleSubmit, formState } = useForm<ResetPasswordDTO>();
    const { isValid } = formState;

    const customSubmit = async (data: any) => {
        try {

            const sendData: ResetPasswordDTO =
                {
                    email: userEmail??"",
                    token: token??"",
                    password: data.password,
                    confirmPassword: data.confirmPassword,


                }
            console.log(sendData)
            await resetPassword(sendData)

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>

            <Container maxWidth="xs" sx={{height: '100%'}}>
                <h1>Reset password </h1>
                <Stack flexDirection="column" alignContent="Center" justifyContent="center" sx={{height: '100%'}}>
                    <Stack component="form" flexDirection="column" alignContent="Center" justifyContent="center" spacing={3}
                           onSubmit={handleSubmit(customSubmit)}>
                        <TextField label="New password" variant="outlined"  type="password" autoFocus {...register('password', {required: true})}/>
                        <TextField label="Confirm  new password" type="password"
                                   variant="outlined" {...register('confirmPassword', {required: true})}/>
                        <Button variant="contained" type="submit" disabled={!isValid}>Submit</Button>
                    </Stack>
                </Stack>
            </Container>
    </div>
);
}



