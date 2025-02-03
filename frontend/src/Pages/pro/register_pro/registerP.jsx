import './registerP.css';

import Header from '../../../Component/Header/header'


function RegisterP() {
    return (
      <div>
        <Header />
        <div className='subscribe'>
          <h2 className='subscribe_title_p'>Inscription Pro</h2>
          <div className='subscribe_container'>
            <div className='subscribe_container_form'>
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Nom' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Prénom' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Adresse' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Email' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Password' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Téléphone' /> 
              <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Numéro De Siret' /> 
              <input className='input_form_send_p' title="Cliquez ici pour vous inscrire" type="submit" /> 
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default RegisterP;