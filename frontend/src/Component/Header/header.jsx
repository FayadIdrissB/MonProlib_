import "./header.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Logo from "../../image/logoP.png";

function Header() {
  const navigate = useNavigate();

  // État pour le dropdown du bouton Inscription (version desktop)
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // État pour le menu mobile (burger)
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);

  // Bascule du dropdown desktop
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Bascule du menu mobile
  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  // Ferme le dropdown si clic en dehors (desktop)
  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  // Ferme le menu mobile si clic en dehors (mobile)
  const handleClickOutsideMobileMenu = (event) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
      setShowMobileMenu(false);
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

  useEffect(() => {
    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutsideMobileMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
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

        {/* Icône burger pour Mobile */}
        <div className="burger-icon mobile-nav" onClick={toggleMobileMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
      </div>

      {/* Menu Mobile */}
      {showMobileMenu && (
        <div className="mobile-menu" ref={mobileMenuRef}>
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
              navigate("/register_user");
              setShowMobileMenu(false);
            }}
          >
            Compte Utilisateur
          </button>
          <button
            className="mobile-menu_item"
            onClick={() => {
              navigate("/register_pro");
              setShowMobileMenu(false);
            }}
          >
            Compte Pro
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
