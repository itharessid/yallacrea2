import React, { useState } from 'react';
import './connexion.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import des icônes

function connexione() {
    const [email, setEmail] = useState(''); // State pour stocker l'adresse e-mail
    const [password, setPassword] = useState(''); // State pour stocker le mot de passe
    const [showPassword, setShowPassword] = useState(false); // State pour gérer la visibilité du mot de passe
    const [errorMessage, setErrorMessage] = useState(''); // State pour gérer les messages d'erreur

    // Fonction pour basculer la visibilité du mot de passe
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Fonction pour gérer le changement de l'adresse e-mail
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Fonction pour gérer le changement du mot de passe
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Fonction pour valider l'adresse e-mail
    const validateEmail = (email) => {
        // Expression régulière pour valider l'adresse e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Fonction pour soumettre le formulaire
   // Fonction pour soumettre le formulaire
const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifie que l'adresse e-mail est valide
    if (!validateEmail(email)) {
        alert('Veuillez entrer une adresse e-mail valide.');
        return;
    }

    // Vérifie la longueur du mot de passe
    if (password.length < 6) {
        setErrorMessage('Le mot de passe incorrect.');
        return;
    }

    // Vérifie si le mot de passe ne contient pas de chiffres
    if (/\d/.test(password)) {
        setErrorMessage('Le mot de passe incorrect.');
        return;
    }

    // Redirection vers la page de détail si le mot de passe est valide
    window.location.href = "/pres";
};
  return (
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-6 ">
            <img className="logo-img1" src="/src/assets/images/aut2.png" alt="Logo" />
        </div>
        <div className="col-md-6">
            <div className="splash-container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <img className="logo-img2" src="/src/assets/images/yallalogo.png" alt="Logo" />
                        <h5 className="card-title text-center"> Se Connecter</h5>
                        <hr className="my-2" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }} />
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="connectemail">
                                    <input 
                                        type="email"
                                        className="form-control form-control-lg input-lg"
                                        placeholder="Adresse e-mail"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3"></div>
                                <div className="input-group custom">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control form-control-lg input-lg ${errorMessage ? 'input-error' : ''}`}
                                    placeholder="********"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                      />

                                    <div className="input-group-append custom">
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                <div className="text-center">
                                    <button type="submit" className="button">Se connecter</button>
                                </div>
                            </form>
                            <div className="text-center">
                                <a href="/mdp">Mot de passe oublié ?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default connexione
