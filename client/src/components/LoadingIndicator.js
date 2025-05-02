import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

function LoadingIndicator() {
  const loading = useSelector((state) => state.app.loading);

  if (!loading) return null;

  return (
    <Box display="flex" justifyContent="center" marginBottom="2rem">
      <CircularProgress />
    </Box>
  );
}

export default LoadingIndicator;
