import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formLogin.css';

function FormLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [msg, setMsg] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
              // { setMsg({ text: '✅ Connexion réussie ! Redirection en cours...', type: 'success' });  }

                // Stocker les informations de l'utilisateur dans le localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('prenom', data.prenom); // ✅ Ajout du prénom

                // Redirection vers la page de compte avec l'ID
                setTimeout(() => {
                    if (data.role === 'pro') {
                        navigate(`/welcome_pro/${data.userId}`);
                    } else {
                        navigate(`/welcome_user/${data.userId}`);
                    }
                }, 100);
            } else {
                setMsg({ text: data.error || '❌ Email ou mot de passe incorrect', type: 'error' });
            }
        } catch (error) {
            setMsg({ text: '❌ Erreur serveur, veuillez réessayer plus tard.', type: 'error' });
        }
    };

    return (
        <div className='login'>
            <h2 className='container_login_title'>
                Connexion
            </h2>
            <form className='container_login' onSubmit={handleSubmit}>
                <div className='container_login_form'>
                    <input
                        className='container_login_form_input'
                        name="email"
                        placeholder='Email'
                        onChange={handleChange}
                    />
                    <input
                        className='container_login_form_input'
                        name="password"
                        type="password"
                        placeholder='Mot de passe'
                        onChange={handleChange}
                    />
                    <button className='container_form_send' type="submit">
                        Se connecter
                    </button>
                    {msg.text && <p className={`message ${msg.type}`}>{msg.text}</p>}
                </div>
            </form>
        </div>
    );
}

export default FormLogin;