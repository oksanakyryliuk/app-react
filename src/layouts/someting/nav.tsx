import { Link } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth} from "../../auth/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {AppModules} from "../../common/enums/AppModules";
import { useState } from 'react';

export default function ButtonAppBar() {
    const [isToken, setToken] = useState(false);
    const { isLoggedIn, isAdmin, isUser, isModerator } = useAuth(); // Assuming you have access to user roles
    const navigate = useNavigate();
    let redirectTo = AppModules.Login;

    if (isLoggedIn&&isAdmin) {
            redirectTo = AppModules.Admin;
        }
    if (isLoggedIn&&isUser) {
        redirectTo = AppModules.User;
    }

    const handleClickLogin = () => {
        navigate(AppModules.Login); // Perform the redirection
    };

    const handleButtonClick = () => {
        if (isLoggedIn) {
            // Якщо користувач ввійшов в систему, то робимо логаут.
            setToken(false);

            // Видалення токену з локального сховища.
            localStorage.removeItem('authData');
            window.location.reload();
        }
        else
        {

        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TestHub
                    </Typography>

                    {isLoggedIn ? (
                 <Button color="inherit" onClick={handleButtonClick} > Logout</Button>
                    ) : (
                        <p>
                            <Button color="inherit" onClick={handleClickLogin} > Login / Sign Up</Button>

                        </p>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    );
}
