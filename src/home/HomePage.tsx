import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuth } from '../auth/hooks/useAuth';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AppModules } from '../common/enums/AppModules';
import { useNavigate } from 'react-router-dom';
import ButtonAppBar from "../layouts/someting/nav";

export const HomePage = () => {

    return (
        <Box>
            <ButtonAppBar></ButtonAppBar>
        </Box>
    );
};