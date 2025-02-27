import { useState } from "react";
import "./welcomeUser.css";

import HeaderPro from "../../../Component/header_connexion/headerConnexion";
import SearchBar from "../../../Component/SearchBar/searchBar";
import PlaceCard from "../../../Component/placeCard/placeCard";  // ✅ Import du composant

function WelcomeUser() {
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (query, location) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/places/search?query=${query}&location=${location}`
      );

      if (!response.ok) {
        throw new Error(`Erreur API : ${response.status}`);
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        setResults([]);
      }

      setSearchPerformed(true);
    } catch (error) {
      setSearchPerformed(true);
      setResults([]);
    }
  };

  return (
    <div className="container-card">
      <HeaderPro />
      <SearchBar onSearch={handleSearch} />

      {searchPerformed && results.length > 0 ? (
        <div className="welcome-container">
          {results.map((place, index) => (
            <PlaceCard key={index} place={place} />
          ))}
        </div>
      ) : searchPerformed ? (
        <div className="container_user">
          <h2>Aucun garage trouvé</h2>
        </div>
      ) : null}
    </div>
  );
}

export default WelcomeUser;