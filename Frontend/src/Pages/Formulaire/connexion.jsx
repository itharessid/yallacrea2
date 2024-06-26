import React, { useState } from 'react';
import './connexion.css';
import { Link, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useCreateurContext } from '../Createur/CreateurContext.jsx'; 

function Connexion() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const { selectedCreateurId } = useCreateurContext(); 
    const { id } = useParams();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!validateEmail(email)) {
            setErrorMessage('Veuillez entrer une adresse e-mail valide.');
            return;
        }
    
        if (password.length < 6) {
            setErrorMessage('Le mot de passe doit comporter au moins 6 caractères.');
            return;
        }
    
        // Construire l'URL de redirection en fonction de selectedCreateurId ou id s'il est défini
        let detailPageURL = '/detail';
        if (selectedCreateurId) {
            detailPageURL = `/detail/${selectedCreateurId}`;
        } else if (id) {
            detailPageURL = `/detail/${id}`;
        }
    
        // Naviguer vers la page de détail après la soumission du formulaire
        // Utilisez Link pour naviguer
        window.location.href = detailPageURL;
    };
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <img className="logo-img1" src="/src/assets/images/aut2.png" alt="Logo" />
                </div>
                <div className="col-md-6">
                    <div className="splash-container">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <img className="logo-img2" src="/src/assets/images/yallalogo.png" alt="Logo" />
                                <h5 className="card-title text-center">Se Connecter</h5>
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
                                            <button type="submit" className="btn btn-primary">Se connecter</button>
                                            <Link to={`/detail/${selectedCreateurId || id}`} className={!email || !password || !validateEmail(email) || password.length < 6 ? "disabled-link" : ""}></Link>
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
    );
}

export default Connexion;
