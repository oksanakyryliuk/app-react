import { Grid } from '@mui/material';
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link, Outlet } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { LazyModel } from '../../common/models/LazyModel';
import Button from '@mui/material/Button';
import { LazySection } from '../../common/components/LazySection';

export type CrudItem = {
  id: number;
  name: string;
};

export interface StandardCrudLayoutProps {
  items: LazyModel<CrudItem[] | undefined>;
  loading: boolean;
  error: any;
}

export const StandardCrudLayout = ({
  items,
  loading,
  error,
}: StandardCrudLayoutProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} flexDirection="column">
        <Button component={Link} to="./create">
          <ListItemText primary="Create" />
        </Button>
        <List>
          <LazySection loading={loading} error={error}>
            {items?.data?.map(({ name, id }) => (
              <ListItem disablePadding key={id}>
                <ListItemButton component={Link} to={`./${id}`}>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </LazySection>
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
