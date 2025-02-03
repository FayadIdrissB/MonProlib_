import './registerU.css';

import Header from '../../../Component/Header/header'


function RegisterU() {
    return (
      <div>
        <Header />
        <div className='subscribe'>
          <h2 className='subscribe_title'>Inscription Utilisateur</h2>
          <div className='subscribe_container'>
            <div className='subscribe_container_form_U'>
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Nom' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Prénom' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Adresse' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Email' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Téléphone' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Mot de passe' /> 
              <input className='input_form_send' title="Cliquez ici pour vous inscrire" type="submit" /> 
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default RegisterU;