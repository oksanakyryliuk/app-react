import Box from '@mui/material/Box';
import { AppToolbar } from './AppToolbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppToolbar />
      <Outlet />
    </Box>
  );
}
