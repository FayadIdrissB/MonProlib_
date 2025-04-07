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

  // États pour le rendu conditionnel des horaires et des activités
  const [displayHoraire, setDisplayHoraire] = useState(false);
  const [displayActivity, setDisplayActivity] = useState(false);

  // Champs pour l'activité proposée
  const [nameActivity, setNameActivity] = useState("");
  const [descriptionActivity, setDescriptionActivity] = useState("");
  const [durationActivity, setDurationActivity] = useState("");

  // Génération des options pour les horaires de 06:00 à 22:00
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
      // Envoi des données en respectant le modèle Mongoose
      const response = await fetch("http://localhost:3000/api/annonces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
          activities: [
            {
              name: nameActivity,
              description: descriptionActivity,
              duration: durationActivity,
            },
          ],
        }),
      });
      if (response.ok) {
        console.log("Envoi réussi");
      } else {
        console.log("Envoi échoué");
      }
    } catch (error) {
      console.log("Envoi échoué", error);
    }
  };

  // Fonctions pour passer en mode aperçu des horaires et des activités
  const handleEnregistrerHoraires = (event) => {
    event.preventDefault();
    setDisplayHoraire(true);
  };

  const handleEnregistrerActivite = (event) => {
    event.preventDefault();
    setDisplayActivity(true);
  };

  // Nouveaux gestionnaires pour revenir en mode modification
  const handleModifierHoraires = () => {
    setDisplayHoraire(false);
  };

  const handleModifierActivite = () => {
    setDisplayActivity(false);
  };

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
      {/* Bouton pour modifier les horaires */}
      <button onClick={handleModifierHoraires}>Modifier horaires</button>
    </div>
  );

  // Rendu conditionnel pour l'activité
  const renderActivity = () => (
    <div className="activitesAffichage">
      <h3>Activité proposée :</h3>
      <p>
        {nameActivity} - {descriptionActivity} - {durationActivity}
      </p>
      {/* Bouton pour modifier l'activité */}
      <button onClick={handleModifierActivite}>Modifier activité</button>
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
            <button onClick={handleEnregistrerHoraires}>
              Enregistrer horaires de travail
            </button>
          </div>
        ) : (
          renderHoraires()
        )}
      </section>

      <section>
        <h2>Vos activités proposées</h2>
        {!displayActivity ? (
          <div className="activityForm">
            <div>
              <label htmlFor="nameActivity">Nom de l'activité :</label>
              <input
                type="text"
                name="nameActivity"
                value={nameActivity}
                placeholder="Nom de l'activité"
                onChange={(e) => setNameActivity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="descriptionActivity">
                Description de l'activité :
              </label>
              <input
                type="text"
                name="descriptionActivity"
                value={descriptionActivity}
                placeholder="Description de l'activité"
                onChange={(e) => setDescriptionActivity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="durationActivity">Durée de l'activité :</label>
              <input
                type="text"
                name="durationActivity"
                value={durationActivity}
                placeholder="Durée de l'activité"
                onChange={(e) => setDurationActivity(e.target.value)}
              />
            </div>
            <button onClick={handleEnregistrerActivite}>
              Enregistrer activité
            </button>
          </div>
        ) : (
          renderActivity()
        )}
      </section>

      <button type="submit" className="sendDataForm">
        Poster mon annonce
      </button>
    </form>
  );
};

export default Annonce;
