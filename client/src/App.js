import React from 'react';
import { Container, Typography } from '@mui/material';
import { Provider } from 'react-redux';
import store from './redux/store';
import SearchBar from './components/SearchBar';
import LoadingIndicator from './components/LoadingIndicator';
import Summary from './components/Summary';
import CompanyInfo from './components/CompanyInfo/CompanyInfo';
import PriceVolumeTable from './components/PriceVolumeTable/PriceVolumeTable';
import RedditPosts from './components/RedditPosts/RedditPosts';
import SentimentPieChart from './components/SentimentPieChart'; // New import

function App() {
  return (
    <Provider store={store}>
      <Container style={{ padding: "2rem" }}>
        <Typography variant="h3" gutterBottom>📈 Stock Sentiment Analyzer</Typography>
        <SearchBar />
        <LoadingIndicator />
        <Summary />
        <CompanyInfo />
        {/* <SentimentPieChart />  */}
        <PriceVolumeTable />
        <RedditPosts />
      </Container>
    </Provider>
  );
}

export default App;
