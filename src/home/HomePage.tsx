import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuth } from '../auth/hooks/useAuth';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AppModules } from '../common/enums/AppModules';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const { isLoggedIn, isAdmin, isUser, isModerator } = useAuth(); // Assuming you have access to user roles
    const navigate = useNavigate();
    let redirectTo = AppModules.Login;
    if (isLoggedIn) {
        if (isAdmin) {
            redirectTo = AppModules.Admin;
        } else if (isUser) {
            redirectTo = AppModules.User;
        } else if (isModerator) {
            redirectTo = AppModules.Moderator;
        }
    } else {
        redirectTo = AppModules.Login;
    }
    const handleClick = () => {
        navigate(redirectTo); // Perform the redirection
    };
    return (
        <Box>
            <button onClick={handleClick}>
                {isLoggedIn ? 'Dashboard' : 'Login'}
            </button>
        </Box>
    );
};