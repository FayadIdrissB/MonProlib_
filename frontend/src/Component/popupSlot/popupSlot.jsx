import React, { useState, useEffect } from "react";
import "./popupSlot.css";

const PopupSlot = ({ visible, onClose, onSave, slotTime }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState([]);
  const [selectedActivite, setSelectedActivite] = useState("");

  // Réinitialise les champs lorsque le popup devient visible
  useEffect(() => {
    if (visible) {
      setTitle("");
      setDescription("");
      setSelectedActivite("");
    }
  }, [visible]);

  // Récupère les activités uniquement lorsque le popup est visible
  useEffect(() => {
    if (visible) {
      fetch("http://localhost:3000/api/annonces/activitys")
        .then((response) => response.json())
        .then((data) => {
          setActivities(data);
        })
        .catch((error) => {
          console.error("Error fetching activities:", error);
        });
    }
  }, [visible]);

  // Ne pas conditionner l'exécution des hooks au retour du composant
  if (!visible) return null;

  const listItems = activities.map((item, index) => (
    <option key={index} value={item.name}>
      {item.name}
    </option>
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
        <div className="selectActivity">
          <label>Sélectionner une activité :</label>
          <select
            value={selectedActivite}
            onChange={(e) => setSelectedActivite(e.target.value)}
          >
            <option value="">Sélectionnez une activité</option>
            {listItems}
          </select>
        </div>
        <div className="popup-actions">
          <button onClick={() => onSave(title, description, selectedActivite)}>
            Enregistrer
          </button>
          <button onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default PopupSlot;
