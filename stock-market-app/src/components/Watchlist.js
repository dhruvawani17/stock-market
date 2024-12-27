import React, { useState } from 'react';
import StockCard from './StockCard';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (stock) => {
    setWatchlist([...watchlist, stock]);
  };

  return (
    <div>
      {watchlist.map((stock, index) => (
        <StockCard key={index} {...stock} />
      ))}
    </div>
  );
};

export default Watchlist;
