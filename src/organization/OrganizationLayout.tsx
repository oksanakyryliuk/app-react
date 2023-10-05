import Box from '@mui/material/Box';
import { OrganizationMenu } from '../organization/OrganizationMenu';
import { Outlet } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';

export default function OrganizationLayout() {
  return (
    <>
      <OrganizationMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
}
