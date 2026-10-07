import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchCoinData, fetchChartData } from "../api/coinGecko";
import { formatPrice } from "../utils/formatter";
import { LineChart, ResponsiveContainer } from "recharts";

export const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCoinData();
    loadChartData();
  }, [id]);

  const loadCoinData = async () => {
    try {
      const data = await fetchCoinData(id);
      setCoin(data);
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadChartData = async () => {
    try {
      const data = await fetchChartData(id);
      const formattedData = data.prices.map((price, key) => ({
        time: new Date(price[0]).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: price[1].toFixed(2),
      }));
      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading Coin Data...</p>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="app">
        <div className="no-results">
          <p>Coin not found</p>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>
    );
  }

  const priceChange = coin.market_data.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>💎 Crypto Informer</h1>
            <p>Get Updated Cryptocurrency Information here</p>
          </div>

          <button className="back-button" onClick={() => navigate("/")}>
            Back to List
          </button>
        </div>
      </header>

      <div className="coin-detail">
        <div className="coin-header">
          <div className="coin-title">
            <img src={coin.image.large} alt={coin.name} />
            <div>
              <h2>{coin.name}</h2>
              <p className="symbol">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
          <span className="rank">Rank #{coin.market_data.market_cap_rank}</span>
        </div>
      </div>

      <div className="coin-price-section">
        <div className="current-price">
          <h2>{formatPrice(coin.market_data.current_price.usd)}</h2>
          <span
            className={`change-badge ${isPositive ? "positive" : "negative"}`}
          >
            {isPositive ? "↑" : "↓"} {Math.abs(priceChange).toFixed(2)}
          </span>
        </div>

        <div className="price-ranges">
          <div className="price-range">
            <span className="range-label">24h High</span>
            <span className="range-value">
              {formatPrice(coin.market_data.high_24h.usd)}
            </span>
          </div>
          <div className="price-range">
            <span className="range-label">24h Low</span>
            <span className="range-value">
              {formatPrice(coin.market_data.low_24h.usd)}
            </span>
          </div>
        </div>
      </div>
      <div className="chart-section">
        <h3>Price Chart (7 Days)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}></LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
