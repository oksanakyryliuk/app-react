import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import Toolbar from '@mui/material/Toolbar';
import { useAuthStore } from '../../auth/store/useAuthStore';

export const AppToolbar = () => {
  const { token, logout } = useAuth();
  const { user, loadUser } = useAuthStore();
  useEffect(() => {
    loadUser();
  }, [token]);
  const { data } = user;
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Stack direction="row" spacing={3}>

          <Button color="inherit" variant="contained" onClick={() => logout()}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
