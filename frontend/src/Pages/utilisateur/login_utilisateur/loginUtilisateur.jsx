import './loginUtilisateur.css';
import Header from '../../../Component/Header/header';

import { useNavigate } from 'react-router-dom';


function LoginUtilisateur() {

  const navigate = useNavigate();

  return (
    <div className='login'>
      <Header />
      <div className='badgePro'> <p className='badge_pro_text'>Utilisateur</p> </div>
      <div className='container_login'>
        <div className='container_login_div'>
          <div className='container_login_fiche' onClick={() => navigate('/Login_pro')}>  <p className='container_login_fiche_text'> Pro </p>   </div>
          <input className='container_login_input' title="Cliquez ici pour vous inscrire" placeholder='Email' /> 
          <input className='container_login_input' title="Cliquez ici pour vous inscrire" placeholder='Mot de passe' /> 
        </div>
      </div>
    </div>
  );
}

export default LoginUtilisateur;