import "./header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Logo from "../../image/logoP.png";

function Header() {
  const navigate = useNavigate();

  // État pour le dropdown du bouton Inscription (version desktop)
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Bascule du dropdown desktop
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Ferme le dropdown si clic en dehors (desktop)
  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutsideDropdown);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [showDropdown]);

  return (
    <div className="header">
      <div className="header_container">
        <div className="header_container_button-logo">
          <img
            src={Logo}
            alt="Logo"
            onClick={() => navigate("/")}
            className="logo_header_"
          />
        </div>

        {/* Navigation Desktop */}
        <div className="header_container_button desktop-nav">
          <button
            className="header_container_button_paragraphe"
            onClick={() => navigate("/about")}
          >
            À propos
          </button>
          <button
            className="header_container_button_paragraphe"
            onClick={() => navigate("/Login")}
          >
            Connexion
          </button>
          <div className="dropdown-container" ref={dropdownRef}>
            <button
              className="header_container_button_started"
              onClick={toggleDropdown}
            >
              Inscription
            </button>

            {showDropdown && (
              <div className="menu">
                <button
                  className="menu_item"
                  onClick={() => {
                    navigate("/register_user");
                    setShowDropdown(false);
                  }}
                >
                  Compte Utilisateur
                </button>
                <button
                  className="menu_item"
                  onClick={() => {
                    navigate("/register_pro");
                    setShowDropdown(false);
                  }}
                >
                  Compte Pro
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Header;
