
"use client"; // This line marks the component as a Client Component

import { useEffect, useState } from 'react';
import LineChart from '../app/components/LineChart';
import BarChart from '../app/components/BarChart';
import PieChart from '../app/components/PieChart';
import CandlestickChart from '../app/components/CandlestickChart';
import { fetchLineChartData, fetchBarChartData, fetchPieChartData, fetchCandlestickData } from '../services/api';

const Dashboard = () => {
  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});
  const [candlestickData, setCandlestickData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lineData = await fetchLineChartData();
        const barData = await fetchBarChartData();
        const pieData = await fetchPieChartData();
        const candlestickData = await fetchCandlestickData();
        
        const processedCandlestickData = candlestickData.data.map(item => ({
          x: new Date(item.x),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close
        }));
        
        
        setLineData(lineData);
        setBarData(barData);
        setPieData(pieData);
        setCandlestickData(processedCandlestickData);
        console.log("Processedsss candlestick data:", processedCandlestickData); // Log processed data
      } catch (err) {
        setError('Failed to fetch chart data.');
      } finally {
        setIsLoaded(true); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen dark">
      <h1 className="text-3xl font-bold mb-6 text-vibrantBlue text-center">Dashboard</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`bg-gray-800 rounded-lg shadow-lg p-4 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-xl font-semibold text-vibrantGreen mb-2">Line Chart</h2>
          <LineChart data={lineData} />
        </div>
        <div className={`bg-gray-800 rounded-lg shadow-lg p-4 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-xl font-semibold text-vibrantRed mb-2">Bar Chart</h2>
          <BarChart data={barData} />
        </div>
        <div className={`bg-gray-800 rounded-lg shadow-lg p-4 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-xl font-semibold text-vibrantOrange mb-2">Pie Chart</h2>
          <PieChart data={pieData} />
        </div>
        <div className={`bg-gray-800 rounded-lg shadow-lg p-4 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-xl font-semibold text-vibrantBlue mb-2">Candlestick Chart</h2>
          <CandlestickChart data={candlestickData} ratio={1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
