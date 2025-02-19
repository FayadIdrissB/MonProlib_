import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './welcomeUser.css';

import HeaderPro from '../../../Component/header_connexion/headerConnexion';
import SearchBar from '../../../Component/SearchBar/SearchBar';

function WelcomeUser() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ID récupéré depuis l'URL :", id); // Vérifier si l'ID est bien récupéré

    if (!id) {
      setError("ID utilisateur manquant dans l'URL");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/auth/users/${id}`);

        console.log("Réponse du serveur :", response); // Log pour voir si l'API répond

        if (!response.ok) {
          throw new Error('Utilisateur non trouvé');
        }

        const data = await response.json();
        setUser(data);
        setError(null);
      } catch (error) {
        console.error('Erreur:', error);
        setError('Impossible de charger les données utilisateur');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <div>
        <HeaderPro />
        <div className='container_user'>
          <h1>Chargement...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <HeaderPro />
        <div className='container_user'>
          <h1>Une erreur est survenue</h1>
          <p>{error}</p>
          <button onClick={() => navigate('/login')}>Retour à la connexion</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeaderPro />
      <div className='container_user'>
        <h1>Bienvenue, {user?.prenom}</h1>
      </div>
      <SearchBar />
    </div>
  );
}

export default WelcomeUser;