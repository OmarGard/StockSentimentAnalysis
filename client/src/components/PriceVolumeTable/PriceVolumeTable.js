import React from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useSelector } from 'react-redux';
import './PriceVolumeTable.css'; // Importación del archivo CSS
function PriceVolumeTable() {
  const data = useSelector((state) => state.app.data);

  if (!data) return null;

  return (
    <div className='price-volume-table'>
      <Typography variant="h4" gutterBottom>Price and Volume Series</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.stock.dates.map((date, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
              <TableCell>${data.stock.price_series[index]}</TableCell>
              <TableCell>{data.stock.volume_series[index].toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PriceVolumeTable;
