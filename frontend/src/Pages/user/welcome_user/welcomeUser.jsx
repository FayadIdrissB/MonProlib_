import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./welcomeUser.css";

import HeaderPro from "../../../Component/header_connexion/headerConnexion";
import SearchBar from "../../../Component/SearchBar/searchBar";

function WelcomeUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);  // ✅ Initialisation en tableau vide
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("ID utilisateur manquant dans l'URL");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/auth/users/${id}`);

        if (!response.ok) {
          throw new Error("Utilisateur non trouvé");
        }

        const data = await response.json();
        setUser(data);
        setError(null);
      } catch (error) {
        console.error("Erreur:", error);
        setError("Impossible de charger les données utilisateur");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSearch = async (query, location) => {
    console.log("🔍 Recherche lancée avec :", query, location);

    try {
      const response = await fetch(
        `http://localhost:3000/api/places/search?query=${query}&location=${location}`
      );

      console.log("📡 Réponse reçue du serveur :", response);

      if (!response.ok) {
        throw new Error(`Erreur API : ${response.status}`);
      }

      const data = await response.json();
      console.log("📌 Données API reçues sur le frontend :", data);

      setResults(data.candidates || []);  // ✅ Correction ici : utilisation de `candidates`
      setSearchPerformed(true);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des garages :", error);
    }
  };

  if (loading) {
    return (
      <div>
        <HeaderPro />
        <div className="container_user">
          <h1>Chargement...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <HeaderPro />
        <div className="container_user">
          <h1>Une erreur est survenue</h1>
          <p>{error}</p>
          <button onClick={() => navigate("/login")}>Retour à la connexion</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeaderPro />
      <div className="container_user">
        <h1>Bienvenue, {user?.prenom}</h1>
      </div>
      <SearchBar onSearch={handleSearch} />
      
      {searchPerformed && results && results.length > 0 ? (
        <div className="welcome-container">
          {results.map((place, index) => (
            <div key={index} className="place-card">
              <div className="place-header">
                <img src="/default-avatar.png" alt="Avatar" className="place-avatar" />
                <div className="place-info">
                  <h3 className="place-name">{place.name}</h3>
                </div>
              </div>
              <p className="place-address">📍 {place.formatted_address || "Adresse inconnue"}</p>
              <button className="place-button">VOIR PLUS</button>
            </div>
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