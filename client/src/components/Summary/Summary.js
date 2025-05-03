import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function Summary() {
  const data = useSelector((state) => state.app.data);

  if (!data) return null;

  return (
    <div className='summary-section'>
      <Typography variant="h4" gutterBottom>Summary</Typography>
      <Typography variant="body1" component="p">{data.summary}</Typography>
    </div>
  );
}

export default Summary;
