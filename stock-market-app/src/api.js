import axios from 'axios';

// Define the function to fetch stock data
const getStockData = async (symbol, apiKey) => {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'TIME_SERIES_DAILY',  // Specify daily time series data
        symbol: symbol,                 // The stock symbol (e.g., AAPL)
        apikey: apiKey                  // Your Alpha Vantage API key
      },
    });

    // Return the fetched data
    return response.data;
  } catch (error) {
    // If there's an error, throw a message
    throw new Error('Error fetching stock data: ' + error.message);
  }
};

// Export the function as the default export
export default getStockData;
