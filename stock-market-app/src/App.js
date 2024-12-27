import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, CircularProgress, Card, CardContent, CardActions, IconButton } from '@mui/material';
import getStockData from './api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from './ThemeContext';
import { Brightness4, Brightness7 } from '@mui/icons-material'; // For dark/light icons

// Styles import
import './App.css';

const App = () => {
  const [stockData, setStockData] = useState(null);
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = 'YOUR_API_KEY'; // Replace with your API key
  const { theme, toggleTheme } = useTheme();

  // Fetch stock data
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStockData(symbol, apiKey);
      setStockData(data['Time Series (Daily)']);
    } catch (err) {
      setError('Error fetching stock data');
    } finally {
      setLoading(false);
    }
  };

  // Change body class based on theme
  React.useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
  }, [theme]);

  return (
    <Container maxWidth="md">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Real-Time Stock Market App
        </Typography>

        <IconButton onClick={toggleTheme} color="inherit">
          {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </div>

      <TextField
        label="Enter Stock Symbol (e.g. AAPL)"
        variant="outlined"
        fullWidth
        onChange={(e) => setSymbol(e.target.value)}
        value={symbol}
        style={{ marginBottom: '20px' }}
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
        Search
      </Button>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}

      {error && <Typography color="error" style={{ textAlign: 'center', marginTop: '20px' }}>{error}</Typography>}

      {stockData && (
        <Grid container spacing={3} style={{ marginTop: '30px' }}>
          <Grid item xs={12}>
            <Card className="card">
              <CardContent>
                <Typography variant="h5" component="div">
                  {symbol.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Stock data for {symbol.toUpperCase()} over the last 7 days.
                </Typography>
              </CardContent>
              <CardActions>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={Object.keys(stockData).slice(0, 7).map(key => ({
                      date: key,
                      close: parseFloat(stockData[key]['4. close']),
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default App;
