import React, { useState } from "react";
import "./searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearchClick = () => {
    console.log("🚀 Bouton Rechercher cliqué !");
    
    if (!query || !location) {
      console.error("❌ Nom ou localisation manquant !");
      return;
    }
    
    if (onSearch) {
      onSearch(query, location);
    } else {
      console.error("⚠️ `onSearch` n'est pas défini !");
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Nom, spécialité, établissement..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          className="location-input"
          placeholder="Où ?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchClick}>
          Rechercher
        </button>
      </div>
    </div>
  );
};

export default SearchBar;