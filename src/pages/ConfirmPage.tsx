// @ts-ignore

import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ConfirmEmailDTO, LoginDTO, ResetPasswordDTO, ResetPasswordUserDTO} from "../common/types";
import {useAuth} from "../auth/hooks/useAuth";
import {Button, Container, Stack, TextField} from "@mui/material";
import {useForm} from 'react-hook-form';
import {AppModules} from "../common/enums/AppModules";

export function ConfirmPage() {
    const { token} = useParams();
    const { userEmail} = useParams();
    const {confirmEmail} = useAuth();

    const { register, handleSubmit, formState } = useForm<ResetPasswordDTO>();
    const { isValid } = formState;
    const navigate=useNavigate();
    const customSubmit = async (data: any) => {
        try {

            const sendData: ConfirmEmailDTO =
                {
                    email: userEmail??"",
                    token: token??"",
                }
            console.log(sendData)
            await confirmEmail(sendData)
            navigate(AppModules.Login)

        } catch (error) {
        }
    };

    return (
        <div>

            <Container maxWidth="xs" sx={{height: '100%'}}>
                <h1> Вас вітає TestHub. Будь ласка, натисніть кнопку для підтвердження вашого акаунту </h1>
                <Stack flexDirection="column" alignContent="Center" justifyContent="center" sx={{height: '100%'}}>
                    <Stack component="form" flexDirection="column" alignContent="Center" justifyContent="center" spacing={3}
                           onSubmit={handleSubmit(customSubmit)}>
                        <Button variant="contained" type="submit">Confirm email</Button>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}



