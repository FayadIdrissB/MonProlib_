import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './welcomePro.css';
import HeaderPro from '../../../Component/header_connexion/headerConnexion';

function WelcomePro() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.error('Erreur :', data.error);
        }
      } catch (error) {
        console.error('Erreur serveur:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <HeaderPro />
      <div className='container_pro'>
        <div className='container_pro_text'>
          <div className='container_pro_text_paragraphe'>
            <h1>Bienvenue, {user ? user.email : 'Chargement...'}</h1>
            <p>- Donner de la visibilité à votre activité</p>
            <p>- Envoyer directement vos devis en ligne</p>
            <p>- Faciliter les prises de rendez-vous</p>
          </div>
        </div>

        <div className='container_pro_block'>
          <div className='container_pro_block_info'>
            {user ? (
              <>
                <h2>Informations du compte :</h2>
                <p><strong>Nom :</strong> {user.nom || 'Non renseigné'}</p>
                <p><strong>Prénom :</strong> {user.prenom || 'Non renseigné'}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Numéro de SIRET :</strong> {user.siret || 'Non renseigné'}</p>
              </>
            ) : (
              <p>Chargement des informations...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePro;