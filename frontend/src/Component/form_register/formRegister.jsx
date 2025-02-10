import './formRegister.css';


function FormRegister({title}) {
    return (
       <div className='subscribe'>
           <h2 className='register_title'>{title}</h2>
                <div className='subscribe_container-'>
                    <div className='subscribe_container-forms'>                                          
                    <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Nom' /> 
                    <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Prénom' /> 
                    <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Adresse' /> 
                    <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Email' /> 
                    <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Password' /> 
                    <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Téléphone' /> 
                    <input className='input_form' title="Cliquez ici pour vous inscrire" placeholder='Numéro De Siret' /> 
                    <input className='input_form_send' title="Cliquez ici pour vous inscrire" type="submit" />                            
                    </div>              
                </div>
        </div>
    );
  }
  
  export default FormRegister;