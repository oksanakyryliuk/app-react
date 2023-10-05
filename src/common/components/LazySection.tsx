import React from 'react';
import Typography from '@mui/material/Typography';

interface LazySectionProps {
  loading: boolean;
  error: any;
  children: React.ReactNode;
}

export const LazySection = ({ loading, error, children }: LazySectionProps) => {
  if (loading) {
    return <Typography>Loading</Typography>;
  }
  if (error) {
    return <Typography>Error</Typography>;
  }
  return (
    <>
      {loading && <Typography>Loading</Typography>}
      {error && <Typography>Error</Typography>}
      {!loading && !error && children}
    </>
  );
};
