import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from "../auth/hooks/useAuth";
import { Button, Container, Stack, TextField } from "@mui/material";
import { useForm } from 'react-hook-form';
import {ForgotPasswordDTO, LoginDTO} from "../common/types";

export const ForgotPage = () =>{

        const {register, handleSubmit, formState: {isValid}} = useForm<ForgotPasswordDTO>();
        const { forgotPassword } = useAuth();

    return (
        <div>
            <Container maxWidth="xs" sx={{ height: '100%' }}>
                <h1 style={{ textAlign: 'center' }}>Forgot Password</h1>
                <Stack flexDirection="column" alignContent="center" justifyContent="center" sx={{ height: '100%' }}>
                    <Stack component="form" flexDirection="column" alignContent="center" justifyContent="center" spacing={3}
                           onSubmit={handleSubmit(forgotPassword)}>
                        <TextField label="Email" variant="outlined" autoFocus {...register('email', { required: true })} />
                        <Button variant="contained" type="submit" disabled={!isValid}>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}