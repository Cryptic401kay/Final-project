import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchCryptos } from "../../utils/coinGeckoAPI";
import { CoinDetail } from "../CoinDetail/CoinDetail";
import "./App.css";

import Header from "../Header/Header";
import Controls from "../Controls/Controls";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";

function App() {
  function AppContent() {
    const [cryptoList, setCryptoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("market_cap_rank");
    const [viewMode, setViewMode] = useState("grid");

    useEffect(() => {
      const fetchCryptoData = async () => {
        try {
          const data = await fetchCryptos();
          setCryptoList(data);
        } catch (error) {
          console.error("Error fetching cryptocurrencies:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCryptoData();
      const interval = setInterval(fetchCryptoData, 300000); // Fetch data every 5 minutes
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const filteredList = useMemo(() => {
      const filtered = cryptoList.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "price":
            return a.current_price - b.current_price;
          case "price_desc":
            return b.current_price - a.current_price;
          case "change":
            return (
              a.price_change_percentage_24h - b.price_change_percentage_24h
            );
          case "market_cap":
            return a.market_cap - b.market_cap;
          default:
            return a.market_cap_rank - b.market_cap_rank;
        }
      });
      return filtered;
    }, [cryptoList, sortBy, searchQuery]);

    const { pathname } = useLocation();
    const isHome = pathname === "/";

    return (
      <div className="site-layout">
        {isHome && (
          <>
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <Controls
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </>
        )}

        <main className="site-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isLoading={isLoading}
                  filteredList={filteredList}
                  viewMode={viewMode}
                />
              }
            />
            <Route path="/coin/:id" element={<CoinDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
