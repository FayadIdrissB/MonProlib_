import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import './formRegister.css';

function FormRegister({ title, isPro = false }) {
    const navigate = useNavigate(); // Initialiser la navigation
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        adresse: '',
        email: '',
        password: '',
        telephone: '',
        siret: '',
        role: isPro ? "pro" : "user"
    });
    const [msg, setMsg] = useState({ text: '', type: '' }); // Message d'erreur ou succès

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Une erreur est survenue');
            }

            setMsg({ text: `✅ ${data.message} Vous êtes inscrit en tant que ${data.role}. Redirection...`, type: 'success' });

            // Rediriger vers l'accueil après 2 secondes
            setTimeout(() => {
                navigate('/Login');
            }, 2000);
        } catch (error) {
            setMsg({ text: `❌ Erreur : ${error.message}`, type: 'error' });
        }
    };

    return (
        <div className='subscribe'>
            <h2 className='register_title'>{title}</h2>
            <form className='subscribe_container-' onSubmit={handleSubmit}>
                <div className='subscribe_container-forms'>
                    <input className='input_form' name="nom" placeholder='Nom' onChange={handleChange} />
                    <input className='input_form' name="prenom" placeholder='Prénom' onChange={handleChange} />
                    <input className='input_form' name="adresse" placeholder='Adresse' onChange={handleChange} />
                    <input className='input_form' name="email" placeholder='Email' onChange={handleChange} />
                    <input className='input_form' name="password" type="password" placeholder='Mot de passe' onChange={handleChange} />
                    <input className='input_form' name="telephone" placeholder='Téléphone' onChange={handleChange} />

                    {/* Afficher SIRET seulement si c'est un professionnel */}
                    {isPro && (
                        <input className='input_form' name="siret" placeholder='Numéro De Siret' onChange={handleChange} />
                    )}

                    <button className='input_form_send' type="submit">S'inscrire</button>

                    {/* Afficher le message d'erreur ou de succès */}
                    {msg.text && <p className={`message ${msg.type}`}>{msg.text}</p>}
                </div>
            </form>
        </div>
    );
}

export default FormRegister;