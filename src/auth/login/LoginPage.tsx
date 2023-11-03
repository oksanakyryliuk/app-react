import React from 'react';
import {Button, Container, Stack, TextField, Grid, Link} from "@mui/material";
import {useForm} from 'react-hook-form';
import {LoginDTO} from "../../common/types";
import {useAuth} from "../hooks/useAuth";
import {Link as RouterLink} from "react-router-dom";
import {AppModules} from "../../common/enums/AppModules";

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
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouterLink} to={AppModules.Forgot}>   Forgot password?</Link>
                        </Grid>
                        <Grid item>
                                <Link component={RouterLink} to={AppModules.Register}> Sign Up</Link>
                        </Grid>
                    </Grid>



                </Stack>
            </Stack>
        </Container>
    )
}