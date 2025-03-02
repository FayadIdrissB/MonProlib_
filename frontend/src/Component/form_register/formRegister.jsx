import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formRegister.css';

function FormRegister({ title, isPro = false }) {
    const navigate = useNavigate();
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
    const [msg, setMsg] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 🟢 Vérifier si le numéro de téléphone existe déjà en base de données
            if (formData.telephone) {
                const phoneCheckResponse = await fetch(`http://localhost:3000/api/auth/check-phone/${formData.telephone}`);
                const phoneCheckData = await phoneCheckResponse.json();

                if (phoneCheckData.exists) {
                    setMsg({ text: '❌ Ce numéro de téléphone est déjà utilisé.', type: 'error' });
                    return;
                }
            }

            // 🟢 Vérifier si le SIRET existe déjà en base de données avant de soumettre le formulaire
            if (isPro && formData.siret) {
                const siretCheckResponse = await fetch(`http://localhost:3000/api/auth/check-siret/${formData.siret}`);
                const siretCheckData = await siretCheckResponse.json();

                if (siretCheckData.exists) {
                    setMsg({ text: '❌ Ce numéro de SIRET est déjà utilisé.', type: 'error' });
                    return;
                }
            }

            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Une erreur est survenue');
            }

            setMsg({ text: `✅ ${data.message} redirection...`, type: 'success' });

            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            setMsg({ text: `❌ Erreur : ${error.message}`, type: 'error' });
        }
    };

    return (
        <div className='subscribe'>
            <h2 className='register_title'>{title}</h2>
            <form 
                className={`subscribe_container- ${isPro ? 'subscribe_container-pro' : 'subscribe_container-user'}`} 
                onSubmit={handleSubmit}
            >
                <div className='subscribe_container-forms'>
                    <input className='input_form' name="nom" placeholder='Nom' onChange={handleChange} />
                    <input className='input_form' name="prenom" placeholder='Prénom' onChange={handleChange} />
                    <input className='input_form' name="adresse" placeholder='Adresse' onChange={handleChange} />
                    <input className='input_form' name="email" placeholder='Email' onChange={handleChange} />
                    <input className='input_form' name="password" type="password" placeholder='Mot de passe' onChange={handleChange} />
                    <input className='input_form' name="telephone" placeholder='Téléphone' onChange={handleChange} />

                    {isPro && (
                        <input className='input_form' name="siret" placeholder='Numéro De Siret' onChange={handleChange} />
                    )}

                    <button className='input_form_send' type="submit">S'inscrire</button>

                    {msg.text && <p className={`message ${msg.type}`}>{msg.text}</p>}
                </div>
            </form>
        </div>
    );
}

export default FormRegister;