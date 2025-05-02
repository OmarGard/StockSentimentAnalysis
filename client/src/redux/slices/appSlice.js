import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('app/fetchData', async (symbol) => {
  const response = await axios.get(`http://localhost:8000/analyze/${symbol}`);
  return response.data;
});

const appSlice = createSlice({
  name: 'app',
  initialState: {
    symbol: '',
    data: null,
    loading: false,
  },
  reducers: {
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSymbol } = appSlice.actions;
export default appSlice.reducer;
