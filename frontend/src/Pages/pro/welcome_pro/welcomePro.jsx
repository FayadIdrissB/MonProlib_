import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './welcomePro.css';
import HeaderPro from '../../../Component/header_connexion/headerConnexion';

function WelcomePro() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  console.log("🔍 ID utilisateur récupéré depuis l'URL :", id); // Debug ID

  useEffect(() => {
    if (!id) {
      console.error("❌ Aucun ID utilisateur reçu !");
      return;
    }

    const fetchUserData = async () => {
      console.log("📡 Envoi de la requête pour récupérer l'utilisateur...");
      
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        console.log("📩 Réponse brute du serveur :", response); // Debug response object

        const data = await response.json();
        console.log("📦 Données reçues de l'API :", data); // Debug API response

        if (response.ok) {
          setUser(data);
        } else {
          console.error("❌ Erreur API :", data.error || "Réponse non valide");
        }
      } catch (error) {
        console.error("❌ Erreur serveur :", error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div>
      <HeaderPro />
      {user ? (
        <h1>Bienvenue, {user.prenom} !</h1>
      ) : (
        <p>Chargement des informations...</p>
      )}
    </div>
  );
}

export default WelcomePro;