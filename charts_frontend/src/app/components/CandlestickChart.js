
import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-chart-financial'; // Make sure this package is installed
import 'chartjs-adapter-date-fns'; // or 'chartjs-adapter-dayjs' based on your preference
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

// Register all necessary components including the candlestick controller
Chart.register(...registerables, CandlestickController, CandlestickElement);

const CandlestickChart = ({ data }) => {
  useEffect(() => {
    const ctx = document.getElementById('candlestickChart').getContext('2d');
console.log("Candlestick page  data:", data); // Log data for debugging
    if (data.length === 0) return; // Prevent chart creation if data is empty

    const candlestickChart = new Chart(ctx, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: 'Candlestick Data',
          data: data.map(item => ({
            x: item.x,
            o: item.open,
            h: item.high,
            l: item.low,
            c: item.close
          })),
        }],
      },
      options: {
        animation: {
          duration: 1000,
          easing: 'easeInOutExpo',
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price',
            },
          },
        },
      },
    });

    return () => {
      // Clean up chart when component unmounts
      candlestickChart.destroy();
    };
  }, [data]); // Re-run the effect if data changes

  return <canvas id="candlestickChart" width="200" height="200"></canvas>;
};

export default CandlestickChart;
