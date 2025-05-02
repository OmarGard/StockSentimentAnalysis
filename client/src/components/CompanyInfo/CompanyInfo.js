import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import './CompanyInfo.css'; // Importación del archivo CSS

function CompanyInfo() {
  const data = useSelector((state) => state.app.data);

  if (!data) return null;

  const averageDailyVolume = data.stock.average_daily_volume
    ? data.stock.average_daily_volume.toLocaleString()
    : 'N/A';
  const volatilityEstimate = data.stock.volatility_estimate
    ? `${data.stock.volatility_estimate}%`
    : 'N/A';

  return (
    <div className='company-info'>
      <Typography variant="h4" gutterBottom>Company Info</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Name" secondary={data.stock.name} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Description" secondary={data.stock.description} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Trend" secondary={data.stock.trend} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Price Change (%)" secondary={`${data.stock.price_change_pct}%`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Price Change (Absolute)" secondary={`$${data.stock.price_change_abs}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Start Price" secondary={`$${data.stock.start_price}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Current Price" secondary={`$${data.stock.current_price}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Average Daily Volume" secondary={averageDailyVolume} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Volatility Estimate" secondary={volatilityEstimate} />
        </ListItem>
      </List>
    </div>
  );
}

export default CompanyInfo;
