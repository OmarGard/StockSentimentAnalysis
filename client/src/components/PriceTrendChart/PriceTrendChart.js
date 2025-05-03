import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import './PriceTrendChart.css';
import { Typography } from '@mui/material';

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

function PriceTrendChart() {
  const data = useSelector((state) => state.app.data);

  if (!data) return null;

  const isPositiveTrend = data.stock.price_series[data.stock.price_series.length - 1] > data.stock.price_series[0];

  const chartData = {
    labels: data.stock.dates.map((date) => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Stock price',
        data: data.stock.price_series,
        borderColor: isPositiveTrend ? 'green' : 'red',
        backgroundColor: isPositiveTrend ? 'rgba(0, 128, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1
  };

  return (
    <div className="price-trend-chart">
      <Typography variant="h4" gutterBottom>Price Trend</Typography>
      <div className="chart-container">
            <Line data={chartData} options={options} />
        </div>
    </div>
  );
}

export default PriceTrendChart;