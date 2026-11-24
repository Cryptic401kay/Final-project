import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchCoinData, fetchChartData } from "../../utils/coinGeckoAPI";
import { formatPrice } from "../../utils/formatter";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import "./CoinDetail.css";
import "../ResponsiveDesign/ResponsiveDesign.css";

export const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
        const formattedData = data.prices.map((price) => ({
          time: new Date(price[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: price[1].toFixed(2),
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    loadCoinData();
    loadChartData();
  }, [id]);

  const detailHeader = (
    <header className="site-header">
      <div className="site-header__content">
        <div>
          <h1 className="site-header__title">💎 Crypto Informer</h1>
          <p className="site-header__tagline">
            Get Updated Cryptocurrency Information here
          </p>
        </div>

        <button
          className="site-header__back-button"
          onClick={() => navigate("/")}
        >
          Back to List
        </button>
      </div>
    </header>
  );

  if (isLoading) {
    return (
      <div className="app">
        {detailHeader}
        <div className="loading-state">
          <div className="loading-state__spinner"></div>
          <p className="loading-state__text">Loading Coin Data...</p>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="app">
        {detailHeader}
        <div className="empty-state">
          <p>Coin not found</p>
          <button onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const priceChange = coin.market_data.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="app">
      {detailHeader}

      <main className="coin-detail">
        <div className="coin-detail__header">
          <div className="coin-detail__identity">
            <img
              className="coin-detail__image"
              src={coin.image.large}
              alt={coin.name}
            />
            <div>
              <h2 className="coin-detail__name">{coin.name}</h2>
              <p className="coin-detail__symbol">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
          <span className="coin-detail__rank">
            Rank #{coin.market_data.market_cap_rank}
          </span>
        </div>

        <div className="coin-detail__price-section">
          <div className="coin-detail__current-price">
            <h2 className="coin-detail__price-value">
              {formatPrice(coin.market_data.current_price.usd)}
            </h2>
            <span
              className={`coin-detail__change ${
                isPositive
                  ? "coin-detail__change--positive"
                  : "coin-detail__change--negative"
              }`}
            >
              {isPositive ? "↑" : "↓"} {Math.abs(priceChange).toFixed(2)}
            </span>
          </div>

          <div className="coin-detail__price-ranges">
            <div className="coin-detail__price-range">
              <span className="coin-detail__range-label">24h High</span>
              <span className="coin-detail__range-value">
                {formatPrice(coin.market_data.high_24h.usd)}
              </span>
            </div>
            <div className="coin-detail__price-range">
              <span className="coin-detail__range-label">24h Low</span>
              <span className="coin-detail__range-value">
                {formatPrice(coin.market_data.low_24h.usd)}
              </span>
            </div>
          </div>
        </div>
        <div className="coin-detail__chart">
          <h3 className="coin-detail__chart-title">Price Chart (7 Days)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis
                dataKey="time"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(20, 20, 40, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#e0e0e0",
                }}
              />
              <Line
                dataKey="price"
                type="monotone"
                stroke="#ADD8E6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="coin-detail__stats">
          <div className="coin-detail__stat">
            <span className="coin-detail__stat-label">Market Cap</span>
            <span className="coin-detail__stat-value">
              {formatPrice(coin.market_data.market_cap.usd)}
            </span>
          </div>
          <div className="coin-detail__stat">
            <span className="coin-detail__stat-label">Volume (24h)</span>
            <span className="coin-detail__stat-value">
              {formatPrice(coin.market_data.total_volume.usd)}
            </span>
          </div>
          <div className="coin-detail__stat">
            <span className="coin-detail__stat-label">Circulating Supply</span>
            <span className="coin-detail__stat-value">
              {coin.market_data.circulating_supply.toLocaleString() || "N/A"}
            </span>
          </div>
          <div className="coin-detail__stat">
            <span className="coin-detail__stat-label">Total Supply</span>
            <span className="coin-detail__stat-value">
              {coin.market_data.total_supply?.toLocaleString() || "N/A"}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
