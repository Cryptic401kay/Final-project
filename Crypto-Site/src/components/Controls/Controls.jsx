import "./Controls.css";

function Controls({ sortBy, setSortBy, viewMode, setViewMode }) {
  return (
    <div className="controls">
      <div className="filter-group">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="market_cap_rank">Rank</option>
          <option value="name">Name</option>
          <option value="price">Price (low to high)</option>
          <option value="price_desc">Price (high to low)</option>
          <option value="change">24h Change</option>
          <option value="market_cap">Market Cap</option>
        </select>
      </div>
      <div className="view-toggle">
        <button
          className={viewMode === "grid" ? "active" : ""}
          onClick={() => setViewMode("grid")}
        >
          Grid
        </button>
        <button
          className={viewMode === "list" ? "active" : ""}
          onClick={() => setViewMode("list")}
        >
          List
        </button>
      </div>
    </div>
  );
}

export default Controls;
