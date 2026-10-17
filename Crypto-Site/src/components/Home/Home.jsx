import { CryptoCard } from "../CryptoCard/CryptoCard";
import "./Home.css";

export const Home = ({ isLoading, filteredList, viewMode }) => {
  return (
    <div className="app">
      {isLoading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Loading cryptocurrencies...</p>
        </div>
      ) : (
        <div className={`crypto-container ${viewMode}`}>
          {filteredList.map((crypto, key) => (
            <CryptoCard crypto={crypto} key={key} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
