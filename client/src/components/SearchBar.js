import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSymbol, fetchData } from '../redux/slices/appSlice';

function SearchBar() {
  const { symbol, loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchData(symbol));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box display="flex" gap="1rem" marginBottom="2rem">
      <TextField
        label="Stock Symbol"
        variant="outlined"
        value={symbol}
        onChange={(e) => dispatch(setSymbol(e.target.value))}
        onKeyUp={handleKeyPress}
        placeholder="Enter stock symbol (e.g. AAPL)"
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Analyze"}
      </Button>
    </Box>
  );
}

export default SearchBar;
