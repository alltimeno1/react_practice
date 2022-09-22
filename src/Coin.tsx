import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Coin = {
  beta_value: number;
  circulating_supply: number;
  first_data_at: Date;
  id: string;
  last_updated: Date;
  max_supply: number;
  name: string;
  quotes: { USD: { price: number } };
  rank: number;
  symbol: string;
  total_supply: number;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [myBudget, setMyBudget] = useState(0);
  const [coinPrice, setCoinPrice] = useState(0);

  function handleSelectChange(event: any) {
    const price = event.target.value;

    setCoinPrice(+price);
  }

  function onChange(event: any) {
    setMyBudget(+event.target.value);
    event.target.value = 0;
  }

  useEffect(() => {
    axios.get('https://api.coinpaprika.com/v1/tickers').then((result) => {
      setCoinData(result.data);
      setCoinPrice(result.data[0]?.quotes.USD.price || 0);
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      <h1>The Coins!</h1>
      {isLoading ? <strong>Loading...</strong> : null}
      <select onChange={handleSelectChange}>
        {coinData.map((coin) => {
          const { name, symbol, quotes } = coin;

          return (
            <option value={quotes.USD.price} key={coin.id}>
              {name} ({symbol}): ${quotes.USD.price} USD
            </option>
          );
        })}
      </select>
      <form>
        <input type="text" value={myBudget} onChange={onChange} />
      </form>
      {Math.floor(myBudget / coinPrice)}개 구매 가능
    </div>
  );
}

export default App;
