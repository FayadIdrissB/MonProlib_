import './welcomePro.css';
import HeaderPro from '../../../Component/header_connexion/headerConnexion';


function WelcomePro() {
  return (
    <div>
        <HeaderPro />
        <div className='container_pro'>
          <div className='container_pro_text'>
            <div className='container_pro_text_paragraphe'>
              <h1>La Nouvelle génération pour les pros</h1>
              <p>- Donner de la visibilté à votre activité</p>
              <p>- Envoyer directement vos devis en ligne</p>
              <p>- Facilité les prises de rendez vous</p>
            </div>
          </div>
          <div className='container_pro_block'>
            <div className='container_pro_block_form'>
              <h2 className='form_title'>Vous êtes professionnel ? L’un de nos conseillers peut vous contacter.</h2>
              <input className='form_input' title="Cliquez ici pour vous inscrire" placeholder='Nom' /> 
              <input className='form_input' title="Cliquez ici pour vous inscrire" placeholder='Prénom' /> 
              <input className='form_input' title="Cliquez ici pour vous inscrire" placeholder='Adresse' /> 
              <input className='form_input' title="Cliquez ici pour vous inscrire" placeholder='Numéro de téléphone' /> 
              <input className='form_input' title="Cliquez ici pour vous inscrire" placeholder='Numéro de siret' /> 
              <input className='input_form_send' title="s'inscrire" type="submit" /> 
            </div>
          </div>
        </div>
    </div>
  );
}

export default WelcomePro;