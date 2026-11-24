import "./Header.css";

function Header({ searchQuery, onSearchChange }) {
  return (
    <header className="site-header">
      <div className="site-header__content">
        <div>
          <h1 className="site-header__title">💎 Crypto Informer</h1>
          <p className="site-header__tagline">
            Get Updated Cryptocurrency Information here
          </p>
        </div>
        <div className="site-header__search">
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            className="site-header__search-input"
            onChange={(e) => onSearchChange(e.target.value)}
            value={searchQuery}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
