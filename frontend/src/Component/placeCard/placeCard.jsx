import React from "react";
import "./placeCard.css";

const PlaceCard = ({ place }) => {
  return (
    <div className="place-card">
      <div className="place-header">
        {/* Vérification de l'image, si elle ne charge pas, on met une image par défaut */}
        <img 
          src={place.icon || "/default-avatar.png"} 
          alt="Avatar" 
          className="place-avatar" 
          onError={(e) => { e.target.src = "/default-avatar.png"; }} 
        />
        <div className="place-info">
          <h3 className="place-name">{place.name}</h3>
        </div>
      </div>
      {/* ✅ Correction ici : on affiche `vicinity` si `formatted_address` est manquant */}
      <p className="place-address">
        📍 {place.formatted_address || place.vicinity || "Adresse inconnue"}
      </p>
      <button className="place-button">VOIR PLUS</button>
    </div>
  );
};

export default PlaceCard;