import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'; //  Django server URL

export const fetchLineChartData = async () => {
  const response = await axios.get(`${BASE_URL}/line-chart-data/`);
  return response.data;
};

export const fetchBarChartData = async () => {
  const response = await axios.get(`${BASE_URL}/bar-chart-data/`);
  return response.data;
};

export const fetchPieChartData = async () => {
  const response = await axios.get(`${BASE_URL}/pie-chart-data/`);
  return response.data;
};

// Updated function to fetch candlestick data using Axios
export const fetchCandlestickData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/candlestick-data/`);
    console.log("Fetched candlestick data:", response.data); //  fetched data for debugging

    // Transform data to fit the format required by the chart
    return response.data;
  } catch (error) {
    console.error("Error fetching candlestick data:", error);
    throw error; 
  }
};
