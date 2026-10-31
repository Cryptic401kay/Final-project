import { Link } from "react-router";
import { formatPrice, formatMarketCap } from "../../utils/formatter";
import "./CryptoCard.css";

export const CryptoCard = ({ crypto }) => {
  return (
    <Link to={`/coin/${crypto.id}`} style={{ textDecoration: "none" }}>
      <div className="crypto-card">
        <div className="crypto-card__header">
          <div className="crypto-card__info">
            <img
              className="crypto-card__image"
              src={crypto.image}
              alt={crypto.name}
            />
            <div>
              <h3 className="crypto-card__name">{crypto.name}</h3>
              <p className="crypto-card__symbol">{crypto.symbol.toUpperCase()}</p>
              <span className="crypto-card__rank">#{crypto.market_cap_rank}</span>
            </div>
          </div>
        </div>
        <div className="crypto-card__price">
          <p className="crypto-card__price-value">
            {formatPrice(crypto.current_price)}
          </p>
          <p
            className={`crypto-card__change ${
              crypto.price_change_percentage_24h >= 0
                ? "crypto-card__change--positive"
                : "crypto-card__change--negative"
            }`}
          >
            {crypto.price_change_percentage_24h >= 0 ? "↑" : "↓"}{" "}
            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}
          </p>
        </div>

        <div className="crypto-card__stats">
          <div className="crypto-card__stat">
            <span className="crypto-card__stat-label">Market Cap</span>
            <span className="crypto-card__stat-value">
              ${formatMarketCap(crypto.market_cap)}
            </span>
          </div>

          <div className="crypto-card__stat">
            <span className="crypto-card__stat-label">Volume</span>
            <span className="crypto-card__stat-value">
              ${formatMarketCap(crypto.total_volume)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;
