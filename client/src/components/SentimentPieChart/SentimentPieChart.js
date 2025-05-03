import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Typography } from '@mui/material';
import './SentimentPieChart.css'; // Importación del archivo CSS

Chart.register(ArcElement, Tooltip, Legend);

const SentimentPieChart = () => {
  const data = useSelector((state) => state.app.data);
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  if (!data) return null;

  const countSentiments = (label) => {
    let counter = 0;
    data.reddit.forEach((post) => {
      if (post.sentiment === label) {
        counter += 1;
      }
    });
    return counter;
  };

  const sentimentLabels = {
    Positive: 'Positive',
    Mixed: 'Mixed',
    Negative: 'Negative',
  }
  
  const chartData = {
    labels: ['Positive Reddit Threads', 'Mixed Reddit Threads', 'Negative Reddit Threads'],
    datasets: [
      {
        label: '# of Posts',
        data: [
          countSentiments(sentimentLabels.Positive),
          countSentiments(sentimentLabels.Mixed),
          countSentiments(sentimentLabels.Negative)
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
        labels: {
          font: {
            size: 12, // Reduce label font size
          },
        },
      }
    },
  };

  return (
    <div className="pie-section"> 
      <Typography variant="h4" gutterBottom>Sentiment Distribution</Typography>
      <div className="pie-chart-container">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SentimentPieChart;
