import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StockCard = ({ symbol, price, change }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{symbol}</Typography>
        <Typography variant="body2">{`Price: $${price}`}</Typography>
        <Typography variant="body2">{`Change: ${change}%`}</Typography>
      </CardContent>
    </Card>
  );
};

export default StockCard;
