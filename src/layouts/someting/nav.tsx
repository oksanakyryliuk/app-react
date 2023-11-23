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
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import GroupIcon from '@mui/icons-material/Group';
import {useAuthStore} from "../../auth/store/useAuthStore";
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import { Navigate } from 'react-router-dom'
export default function ButtonAppBar() {
    const { isLoggedIn, isAdmin, isUser } = useAuth(); // Assuming you have access to user roles
    const navigate = useNavigate();
    let redirectTo = AppModules.Login;

    const { token, logout } = useAuth();
    const { user, loadUser } = useAuthStore();
    useEffect(() => {
        loadUser();
    }, [token]);

    const handleButtonClick = () => {
        if (isLoggedIn) {
            localStorage.setItem('authData', '');
            window.location.reload();
        }
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <React.Fragment>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">

                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TestHub
                    </Typography>

                    {isLoggedIn ? (
                        <Button color="inherit"  onClick={() => logout()}>
                            Logout
                        </Button>

                    ) : (
                        <p>
                            <Button color="inherit" >
                                <Link to={AppModules.Login}>   Login </Link>

                                </Button>
                        </p>
                    )}


                    <IconButton
                        onClick={handleClick}
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >


            <MenuItem >
            <HomeIcon/>
                <Link to={AppModules.Home}>  Головна </Link>
            </MenuItem>

            {isLoggedIn?
                (
                    <MenuItem>
                        <Avatar />
                        <Link to={AppModules.User}>    Мій акаунт </Link>
                    </MenuItem>

                ): null }


            <MenuItem >
                <ListItemIcon>
                    <AutoStoriesIcon fontSize="small" />
                    <Link to={AppModules.Test}>    Всі тести </Link>
                </ListItemIcon>
            </MenuItem>


            <MenuItem onClick={() => isAdmin ? navigate(AppModules.Admin) : navigate(AppModules.User)}>
                <ListItemIcon>
                    {isLoggedIn &&isAdmin ? (
                        <GroupIcon fontSize="small" />
                    ) : (
                        <AddToPhotosIcon fontSize="small" />
                    )}
                </ListItemIcon>

                <Link to={isAdmin ? AppModules.Admin : AppModules.User}>
                    {isLoggedIn &&isAdmin ? "Усі юзери" : "Мої тести"}
                </Link>


            </MenuItem>

            {isLoggedIn &&isAdmin?
                (
            <MenuItem>
                <ListItemIcon>
                        <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <Link to={AppModules.Category}>     Категорії</Link>
            </MenuItem>
            ): null }

            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Налаштування
            </MenuItem>


        </Menu>
    </React.Fragment>

    );
}
