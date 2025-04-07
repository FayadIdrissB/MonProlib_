import React, { useState, useEffect } from "react";
import "./popupSlot.css";

const PopupSlot = ({ visible, onClose, onSave, slotTime }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activite, setActivite] = useState("");

  useEffect(() => {
    if (visible) {
      setTitle("");
      setDescription("");
    }
  }, [visible]);

  if (!visible) return null;

  //remplacer par le fetch
  const people = [
    "Creola Katherine Johnson : mathématicienne",
    "Mario José Molina-Pasquel Henríquez : chimiste",
    "Mohammad Abdus Salam : physicien",
    "Percy Lavon Julian : chimiste",
    "Subrahmanyan Chandrasekhar : astrophysicien",
  ];

  const listItems = people.map((person) => (
    <option value={person}>{person}</option>
  ));

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
        <label>
          Sélectionner une activité :<select>{listItems}</select>
        </label>
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
