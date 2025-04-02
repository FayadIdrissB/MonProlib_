import "./header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Logo from "../../image/logoP.png";

function Header() {
  const navigate = useNavigate();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);

  // Bascule l'affichage du menu mobile
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Ferme le menu si l'utilisateur clique en dehors
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMobileMenu(false);
    }
  };

  useEffect(() => {
    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileMenu]);

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

        {/* Navigation classique pour desktop */}
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
          <button
            className="header_container_button_started"
            onClick={() => navigate("/register")}
          >
            Inscription
          </button>
        </div>

        {/* Icône burger pour mobile */}
        <div className="burger-icon mobile-nav" onClick={toggleMobileMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
      </div>

      {/* Menu mobile */}
      {showMobileMenu && (
        <div className="mobile-menu" ref={menuRef}>
          <button
            className="mobile-menu_item"
            onClick={() => {
              navigate("/about");
              setShowMobileMenu(false);
            }}
          >
            À propos
          </button>
          <button
            className="mobile-menu_item"
            onClick={() => {
              navigate("/Login");
              setShowMobileMenu(false);
            }}
          >
            Connexion
          </button>
          <button
            className="mobile-menu_item"
            onClick={() => {
              navigate("/register");
              setShowMobileMenu(false);
            }}
          >
            Inscription
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
