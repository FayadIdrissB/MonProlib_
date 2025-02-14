import './headerConnexion.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../Image/logoP.png';

function HeaderConnexion() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [prenom, setPrenom] = useState('');

    useEffect(() => {
        const storedPrenom = localStorage.getItem('prenom');
        if (storedPrenom) {
            setPrenom(storedPrenom);
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="header">
                <div className="header_container">
                    <div className='header_container_connexion'>
                        <img src={Logo} alt="" onClick={() => navigate('/')} className='logo_header' />
                        <div className='header_container_button_connexion' onClick={toggleMenu}>
                            Bonjour, {prenom || 'Utilisateur'}
                        </div>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="dropdown_menu" ref={menuRef}>
                    <div className="dropdown_item">Mon Espace Pro</div>
                    <div className="dropdown_item">Déposer Mon annonce</div>
                    <div className="dropdown_item">Définir Mes Heures</div>
                    <div className="dropdown_item">Mes Rendez-Vous</div>
                    <div className="dropdown_item">Paramètre</div>
                    <div className="dropdown_item_deconnexion">Déconnexion</div>
                </div>
            )}
        </div>
    );
}

export default HeaderConnexion;