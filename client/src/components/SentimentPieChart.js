import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const SentimentPieChart = () => {
  const sentimentData = useSelector((state) => state.sentiment); // Assuming sentiment data is in Redux store

  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [
          sentimentData.positive || 0,
          sentimentData.neutral || 0,
          sentimentData.negative || 0,
        ],
        backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'], // Green, Yellow, Red
        hoverBackgroundColor: ['#66bb6a', '#fff176', '#e57373'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h3>Sentiment Distribution</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default SentimentPieChart;
