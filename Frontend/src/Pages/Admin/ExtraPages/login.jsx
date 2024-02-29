import React, { useState } from 'react';
import './login.css';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import des icônes
import { Link } from 'react-router-dom';

function Login() {
    const [password, setPassword] = useState(''); // State pour stocker le mot de passe
    const [showPassword, setShowPassword] = useState(false); // State pour gérer la visibilité du mot de passe

    // Fonction pour basculer la visibilité du mot de passe
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <img className="logo-img1" src="/src/assets/images/bureau.jpg" alt="Logo" />
                </div>
                <div className="col-md-6">
                    <div className="splash-container">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <img className="logo-img2" src="/src/assets/images/yallalogo.png" alt="Logo" />
                                <h5 className="card-title text-center">Connexion</h5>
                                <hr className="my-2" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)' }} />
                                <div className="card-body">
                                    <form>
                                        <div className="input-group custom">
                                            <input
                                                type={showPassword ? 'text' : 'password'} // Détermine le type du champ de saisie en fonction de la visibilité du mot de passe
                                                className="form-control form-control-lg input-lg"
                                                placeholder="**********"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div className="input-group-append custom">
                                                <button
                                                    className="btn btn-outline-secondary" // Utilisez une classe Bootstrap pour le style du bouton
                                                    type="button"
                                                    onClick={togglePasswordVisibility} // Appel de la fonction pour basculer la visibilité du mot de passe
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Affiche l'icône correspondante en fonction de la visibilité */}
                                                </button>
                                                <span className="input-group-text">
                                                    <FaLock />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <Link to="/bienvenue" className="button">Se connecter</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
