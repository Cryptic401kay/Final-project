import "./Controls.css";

function Controls({ sortBy, setSortBy, viewMode, setViewMode }) {
  return (
    <div className="market-controls">
      <div className="market-controls__filter">
        <label className="market-controls__label">Sort by:</label>
        <select
          className="market-controls__sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="market_cap_rank">Rank</option>
          <option value="name">Name</option>
          <option value="price">Price (low to high)</option>
          <option value="price_desc">Price (high to low)</option>
          <option value="change">24h Change</option>
          <option value="market_cap">Market Cap</option>
        </select>
      </div>
      <div className="market-controls__view-toggle">
        <button
          className={`market-controls__view-button ${
            viewMode === "grid" ? "market-controls__view-button--active" : ""
          }`}
          onClick={() => setViewMode("grid")}
        >
          Grid
        </button>
        <button
          className={`market-controls__view-button ${
            viewMode === "list" ? "market-controls__view-button--active" : ""
          }`}
          onClick={() => setViewMode("list")}
        >
          List
        </button>
      </div>
    </div>
  );
}

export default Controls;
