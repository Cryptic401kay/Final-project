import "./Header.css";

function Header({ searchQuery, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1>💎 Crypto Informer</h1>
          <p>Get Updated Cryptocurrency Information here</p>
        </div>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            className="search-input"
            onChange={(e) => onSearchChange(e.target.value)}
            value={searchQuery}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
