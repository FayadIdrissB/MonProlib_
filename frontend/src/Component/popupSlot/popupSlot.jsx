import React, { useState, useEffect } from "react";
import "./popupSlot.css";

const PopupSlot = ({ visible, onClose, onSave, slotTime }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Réinitialise les champs lorsque le popup devient visible
  useEffect(() => {
    if (visible) {
      setTitle("");
      setDescription("");
    }
  }, [visible]);

  // Ne pas conditionner l'exécution des hooks au retour du composant
  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Ajouter un créneau - {slotTime.toLocaleString("fr-FR")}</h3>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="popup-actions">
          <button onClick={() => onSave(title, description)}>
            Enregistrer
          </button>
          <button onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default PopupSlot;
