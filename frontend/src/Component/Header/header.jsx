import "./header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Logo from "../../image/logoP.png";

function Header() {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Référence pour détecter les clics en dehors

  // Fonction pour basculer l'affichage du menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Fonction pour fermer le menu si on clique en dehors
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  // Ajout d'un écouteur d'événement pour détecter les clics en dehors
  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="header">
      <div className="header_container">
        <div className="header_container_button-logo">
          <img
            src={Logo}
            alt=""
            onClick={() => navigate("/")}
            className="logo_header_"
          />
        </div>
        <div className="header_container_button">
          <button className="header_container_button_paragraphe">
            À propos
          </button>
          <button
            className="header_container_button_paragraphe"
            onClick={() => navigate("/Login")}
          >
            Connexion
          </button>

          {/* Bouton "Get Started" avec gestion du menu au clic */}
          <button
            className="header_container_button_started"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            Inscription
            {showDropdown && (
              <div className="menu">
                <button
                  className="menu_item"
                  onClick={() => navigate("/register_user")}
                >
                  Compte Utilisateur
                </button>
                <button
                  className="menu_item"
                  onClick={() => navigate("/register_pro")}
                >
                  Compte Pro
                </button>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
