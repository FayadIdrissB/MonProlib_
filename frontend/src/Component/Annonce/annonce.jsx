import { useState } from "react";
import "./annonce.css";

const Annonce = () => {
  // Informations générales de l'annonce
  const [nameCompany, setNameCompany] = useState("");
  const [adresCompany, setAdresCompany] = useState("");

  // Horaires pour chaque jour
  // Lundi
  const [lundiStart, setLundiStart] = useState("");
  const [lundiEnd, setLundiEnd] = useState("");
  const [lundiClosed, setLundiClosed] = useState(false);
  // Mardi
  const [mardiStart, setMardiStart] = useState("");
  const [mardiEnd, setMardiEnd] = useState("");
  const [mardiClosed, setMardiClosed] = useState(false);
  // Mercredi
  const [mercrediStart, setMercrediStart] = useState("");
  const [mercrediEnd, setMercrediEnd] = useState("");
  const [mercrediClosed, setMercrediClosed] = useState(false);
  // Jeudi
  const [jeudiStart, setJeudiStart] = useState("");
  const [jeudiEnd, setJeudiEnd] = useState("");
  const [jeudiClosed, setJeudiClosed] = useState(false);
  // Vendredi
  const [vendrediStart, setVendrediStart] = useState("");
  const [vendrediEnd, setVendrediEnd] = useState("");
  const [vendrediClosed, setVendrediClosed] = useState(false);
  // Samedi
  const [samediStart, setSamediStart] = useState("");
  const [samediEnd, setSamediEnd] = useState("");
  const [samediClosed, setSamediClosed] = useState(false);
  // Dimanche
  const [dimancheStart, setDimancheStart] = useState("");
  const [dimancheEnd, setDimancheEnd] = useState("");
  const [dimancheClosed, setDimancheClosed] = useState(false);

  // États pour le rendu conditionnel
  const [displayHoraire, setDisplayHoraire] = useState(false);
  const [displayAddActivity, setDisplayAddActivity] = useState(false);

  // États pour le formulaire d'ajout d'une nouvelle activité
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [newActivityDuration, setNewActivityDuration] = useState("");

  // État pour stocker toutes les activités (nouvelles)
  const [activitiesList, setActivitiesList] = useState([]);

  // États pour gérer l'édition d'une activité existante
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingDuration, setEditingDuration] = useState("");

  // Génération des options pour les horaires (de 06:00 à 22:00)
  const hourOptions = [];
  for (let hour = 6; hour <= 22; hour++) {
    const formattedHour = hour.toString().padStart(2, "0") + ":00";
    hourOptions.push(
      <option key={formattedHour} value={formattedHour}>
        {formattedHour}
      </option>
    );
  }

  // Soumission globale de l'annonce
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/annonces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameCompany,
          adresCompany,
          workHours: {
            monday: { start: lundiStart, end: lundiEnd, closed: lundiClosed },
            tuesday: { start: mardiStart, end: mardiEnd, closed: mardiClosed },
            wednesday: {
              start: mercrediStart,
              end: mercrediEnd,
              closed: mercrediClosed,
            },
            thursday: { start: jeudiStart, end: jeudiEnd, closed: jeudiClosed },
            friday: {
              start: vendrediStart,
              end: vendrediEnd,
              closed: vendrediClosed,
            },
            saturday: {
              start: samediStart,
              end: samediEnd,
              closed: samediClosed,
            },
            sunday: {
              start: dimancheStart,
              end: dimancheEnd,
              closed: dimancheClosed,
            },
          },
          activities: activitiesList, // Envoi de toutes les activités ajoutées
        }),
      });
      if (response.ok) {
        console.log("Envoi réussi");
        console.log(response);
      } else {
        console.log("Envoi échoué");
      }
    } catch (error) {
      console.log("Envoi échoué", error);
    }
  };

  // Enregistrement d'une nouvelle activité via le formulaire "Ajouter une activité"
  const handleEnregistrerNouvelleActivite = (event) => {
    event.preventDefault();
    const newActivity = {
      name: newActivityName,
      description: newActivityDescription,
      duration: newActivityDuration,
    };
    setActivitiesList([...activitiesList, newActivity]);
    // Réinitialiser les champs et masquer le formulaire
    setNewActivityName("");
    setNewActivityDescription("");
    setNewActivityDuration("");
    setDisplayAddActivity(false);
  };

  // Lancer la modification d'une activité existante
  const handleStartEditing = (index) => {
    setEditingIndex(index);
    setEditingName(activitiesList[index].name);
    setEditingDescription(activitiesList[index].description);
    setEditingDuration(activitiesList[index].duration);
  };

  // Sauvegarder les modifications apportées à une activité
  const handleSaveEditing = (index) => {
    const updatedActivities = [...activitiesList];
    updatedActivities[index] = {
      name: editingName,
      description: editingDescription,
      duration: editingDuration,
    };
    setActivitiesList(updatedActivities);
    setEditingIndex(null);
    setEditingName("");
    setEditingDescription("");
    setEditingDuration("");
  };

  // Modification et enregistrement des horaires
  const handleModifierHoraires = () => {
    setDisplayHoraire(false);
  };

  const handleEnregistrerHoraires = (event) => {
    event.preventDefault();
    setDisplayHoraire(true);
  };

  // Formulaire pour ajouter une nouvelle activité
  const newAddActivityForm = () => (
    <div className="activityForm">
      <div>
        <label htmlFor="newActivityName">Nom de l'activité :</label>
        <input
          type="text"
          name="newActivityName"
          value={newActivityName}
          placeholder="Nom de l'activité"
          onChange={(e) => setNewActivityName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newActivityDescription">
          Description de l'activité :
        </label>
        <input
          type="text"
          name="newActivityDescription"
          value={newActivityDescription}
          placeholder="Description de l'activité"
          onChange={(e) => setNewActivityDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newActivityDuration">Durée de l'activité :</label>
        <input
          type="text"
          name="newActivityDuration"
          value={newActivityDuration}
          placeholder="Durée de l'activité"
          onChange={(e) => setNewActivityDuration(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleEnregistrerNouvelleActivite}>
        Enregistrer activité
      </button>
    </div>
  );

  // Rendu conditionnel pour les horaires
  const renderHoraires = () => (
    <div className="horairesAffichage">
      <h3>Horaires de travail :</h3>
      <p>
        Lundi : {lundiStart} - {lundiEnd} - {lundiClosed ? "Fermé" : "Ouvert"}
      </p>
      <p>
        Mardi : {mardiStart} - {mardiEnd} - {mardiClosed ? "Fermé" : "Ouvert"}
      </p>
      <p>
        Mercredi : {mercrediStart} - {mercrediEnd} -{" "}
        {mercrediClosed ? "Fermé" : "Ouvert"}
      </p>
      <p>
        Jeudi : {jeudiStart} - {jeudiEnd} - {jeudiClosed ? "Fermé" : "Ouvert"}
      </p>
      <p>
        Vendredi : {vendrediStart} - {vendrediEnd} -{" "}
        {vendrediClosed ? "Fermé" : "Ouvert"}
      </p>
      <p>
        Samedi : {samediStart} - {samediEnd} -{" "}
        {samediClosed ? "Fermé" : "Ouvert"}
      </p>
      <p>
        Dimanche : {dimancheStart} - {dimancheEnd} -{" "}
        {dimancheClosed ? "Fermé" : "Ouvert"}
      </p>
      <button type="button" onClick={handleModifierHoraires}>
        Modifier horaires
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="mainForm">
      <h1>Calendrier de Rendez-vous</h1>

      <section className="companyDetails">
        <h2 className="postAnnonce">Poster mon annonce (entreprise)</h2>
        <div>
          <label htmlFor="nameCompany">Nom de l'entreprise :</label>
          <input
            className="inputNameCompany"
            type="text"
            name="nameCompany"
            value={nameCompany}
            placeholder="Nom de votre entreprise"
            onChange={(e) => setNameCompany(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="adresCompany">Adresse de l'entreprise :</label>
          <input
            className="inputAdresCompany"
            type="text"
            name="adresCompany"
            value={adresCompany}
            placeholder="Adresse complète"
            onChange={(e) => setAdresCompany(e.target.value)}
          />
        </div>
      </section>

      <section>
        <h2>Vos horaires de travail</h2>
        {!displayHoraire ? (
          <div className="horairesForm">
            {/* Lundi */}
            <div className="dayRow">
              <h3>Lundi</h3>
              <div>
                <label htmlFor="lundiStart">Début :</label>
                <select
                  name="lundiStart"
                  value={lundiStart}
                  onChange={(e) => setLundiStart(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label htmlFor="lundiEnd">Fin :</label>
                <select
                  name="lundiEnd"
                  value={lundiEnd}
                  onChange={(e) => setLundiEnd(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label>Status :</label>
                <label>
                  <input
                    type="radio"
                    name="lundiStatus"
                    value="open"
                    checked={!lundiClosed}
                    onChange={() => setLundiClosed(false)}
                  />
                  Ouvert
                </label>
                <label>
                  <input
                    type="radio"
                    name="lundiStatus"
                    value="closed"
                    checked={lundiClosed}
                    onChange={() => setLundiClosed(true)}
                  />
                  Fermé
                </label>
              </div>
            </div>
            {/* Mardi */}
            <div className="dayRow">
              <h3>Mardi</h3>
              <div>
                <label htmlFor="mardiStart">Début :</label>
                <select
                  name="mardiStart"
                  value={mardiStart}
                  onChange={(e) => setMardiStart(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label htmlFor="mardiEnd">Fin :</label>
                <select
                  name="mardiEnd"
                  value={mardiEnd}
                  onChange={(e) => setMardiEnd(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label>Status :</label>
                <label>
                  <input
                    type="radio"
                    name="mardiStatus"
                    value="open"
                    checked={!mardiClosed}
                    onChange={() => setMardiClosed(false)}
                  />
                  Ouvert
                </label>
                <label>
                  <input
                    type="radio"
                    name="mardiStatus"
                    value="closed"
                    checked={mardiClosed}
                    onChange={() => setMardiClosed(true)}
                  />
                  Fermé
                </label>
              </div>
            </div>
            {/* Mercredi */}
            <div className="dayRow">
              <h3>Mercredi</h3>
              <div>
                <label htmlFor="mercrediStart">Début :</label>
                <select
                  name="mercrediStart"
                  value={mercrediStart}
                  onChange={(e) => setMercrediStart(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label htmlFor="mercrediEnd">Fin :</label>
                <select
                  name="mercrediEnd"
                  value={mercrediEnd}
                  onChange={(e) => setMercrediEnd(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label>Status :</label>
                <label>
                  <input
                    type="radio"
                    name="mercrediStatus"
                    value="open"
                    checked={!mercrediClosed}
                    onChange={() => setMercrediClosed(false)}
                  />
                  Ouvert
                </label>
                <label>
                  <input
                    type="radio"
                    name="mercrediStatus"
                    value="closed"
                    checked={mercrediClosed}
                    onChange={() => setMercrediClosed(true)}
                  />
                  Fermé
                </label>
              </div>
            </div>
            {/* Jeudi */}
            <div className="dayRow">
              <h3>Jeudi</h3>
              <div>
                <label htmlFor="jeudiStart">Début :</label>
                <select
                  name="jeudiStart"
                  value={jeudiStart}
                  onChange={(e) => setJeudiStart(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label htmlFor="jeudiEnd">Fin :</label>
                <select
                  name="jeudiEnd"
                  value={jeudiEnd}
                  onChange={(e) => setJeudiEnd(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label>Status :</label>
                <label>
                  <input
                    type="radio"
                    name="jeudiStatus"
                    value="open"
                    checked={!jeudiClosed}
                    onChange={() => setJeudiClosed(false)}
                  />
                  Ouvert
                </label>
                <label>
                  <input
                    type="radio"
                    name="jeudiStatus"
                    value="closed"
                    checked={jeudiClosed}
                    onChange={() => setJeudiClosed(true)}
                  />
                  Fermé
                </label>
              </div>
            </div>
            {/* Vendredi */}
            <div className="dayRow">
              <h3>Vendredi</h3>
              <div>
                <label htmlFor="vendrediStart">Début :</label>
                <select
                  name="vendrediStart"
                  value={vendrediStart}
                  onChange={(e) => setVendrediStart(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label htmlFor="vendrediEnd">Fin :</label>
                <select
                  name="vendrediEnd"
                  value={vendrediEnd}
                  onChange={(e) => setVendrediEnd(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label>Status :</label>
                <label>
                  <input
                    type="radio"
                    name="vendrediStatus"
                    value="open"
                    checked={!vendrediClosed}
                    onChange={() => setVendrediClosed(false)}
                  />
                  Ouvert
                </label>
                <label>
                  <input
                    type="radio"
                    name="vendrediStatus"
                    value="closed"
                    checked={vendrediClosed}
                    onChange={() => setVendrediClosed(true)}
                  />
                  Fermé
                </label>
              </div>
            </div>
            {/* Samedi */}
            <div className="dayRow">
              <h3>Samedi</h3>
              <div>
                <label htmlFor="samediStart">Début :</label>
                <select
                  name="samediStart"
                  value={samediStart}
                  onChange={(e) => setSamediStart(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label htmlFor="samediEnd">Fin :</label>
                <select
                  name="samediEnd"
                  value={samediEnd}
                  onChange={(e) => setSamediEnd(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label>Status :</label>
                <label>
                  <input
                    type="radio"
                    name="samediStatus"
                    value="open"
                    checked={!samediClosed}
                    onChange={() => setSamediClosed(false)}
                  />
                  Ouvert
                </label>
                <label>
                  <input
                    type="radio"
                    name="samediStatus"
                    value="closed"
                    checked={samediClosed}
                    onChange={() => setSamediClosed(true)}
                  />
                  Fermé
                </label>
              </div>
            </div>
            {/* Dimanche */}
            <div className="dayRow">
              <h3>Dimanche</h3>
              <div>
                <label htmlFor="dimancheStart">Début :</label>
                <select
                  name="dimancheStart"
                  value={dimancheStart}
                  onChange={(e) => setDimancheStart(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label htmlFor="dimancheEnd">Fin :</label>
                <select
                  name="dimancheEnd"
                  value={dimancheEnd}
                  onChange={(e) => setDimancheEnd(e.target.value)}
                >
                  {hourOptions}
                </select>
              </div>
              <div>
                <label>Status :</label>
                <label>
                  <input
                    type="radio"
                    name="dimancheStatus"
                    value="open"
                    checked={!dimancheClosed}
                    onChange={() => setDimancheClosed(false)}
                  />
                  Ouvert
                </label>
                <label>
                  <input
                    type="radio"
                    name="dimancheStatus"
                    value="closed"
                    checked={dimancheClosed}
                    onChange={() => setDimancheClosed(true)}
                  />
                  Fermé
                </label>
              </div>
            </div>
            <button type="button" onClick={handleEnregistrerHoraires}>
              Enregistrer horaires de travail
            </button>
          </div>
        ) : (
          renderHoraires()
        )}
      </section>

      <section>
        <h2>Ajouter une activité</h2>
        <button type="button" onClick={() => setDisplayAddActivity(true)}>
          Ajouter une activité
        </button>
        {displayAddActivity && newAddActivityForm()}
      </section>

      {/* Affichage dynamique de toutes les activités enregistrées avec possibilité de modification */}
      {activitiesList.length > 0 && (
        <section className="allActivities">
          <h2>Toutes les activités enregistrées</h2>
          {activitiesList.map((activity, index) => (
            <div key={index} className="activityItem">
              {editingIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editingDuration}
                    onChange={(e) => setEditingDuration(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveEditing(index)}
                  >
                    Enregistrer
                  </button>
                </div>
              ) : (
                <div>
                  <p>
                    {activity.name} - {activity.description} -{" "}
                    {activity.duration}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleStartEditing(index)}
                  >
                    Modifier
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      <button type="submit" className="sendDataForm">
        Poster mon annonce
      </button>
    </form>
  );
};

export default Annonce;
