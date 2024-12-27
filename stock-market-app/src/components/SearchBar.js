import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [symbol, setSymbol] = useState('');

  const handleSearch = () => {
    if (symbol) {
      onSearch(symbol);
    }
  };

  return (
    <div>
      <TextField 
        label="Stock Symbol" 
        variant="outlined" 
        onChange={(e) => setSymbol(e.target.value)} 
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
