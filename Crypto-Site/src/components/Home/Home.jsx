import { CryptoCard } from "../CryptoCard/CryptoCard";
import "./Home.css";

export const Home = ({ isLoading, filteredList, viewMode }) => {
  return (
    <div className="app">
      {isLoading ? (
        <div className="loading-state">
          <div className="loading-state__spinner" />
          <p className="loading-state__text">Loading cryptocurrencies...</p>
        </div>
      ) : (
        <div className={`coin-list coin-list--${viewMode}`}>
          {filteredList.map((crypto, key) => (
            <CryptoCard crypto={crypto} key={key} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
