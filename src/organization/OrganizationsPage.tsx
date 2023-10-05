import React from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { useAuthStore } from '../auth/store/useAuthStore';
import { Link } from 'react-router-dom';

export const OrganizationsPage = () => {
  const { user } = useAuthStore();
  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography sx={{ marginTop: 3 }}>Registered organizations</Typography>
      {/*<List>*/}
      {/*  /!*{user?.data?.ownerOrganizations.map(({ id, name }) => (*!/*/}
      {/*    <ListItem disablePadding key={id}>*/}
      {/*      <ListItemButton component={Link} to={`./${id}`}>*/}
      {/*        <ListItemText primary={name} />*/}
      {/*      </ListItemButton>*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</List>*/}
    </Container>
  );
};
