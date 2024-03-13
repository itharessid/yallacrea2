import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faPhone, faAt, faLock, faLink } from '@fortawesome/free-solid-svg-icons'; // Importez les icônes nécessaires
import { Link } from 'react-router-dom';
import './preInscriEtud.css';

function preInscriEtud() {
    const [selectedDate, setSelectedDate] = useState(null); // Définition de l'état pour la date sélectionnée

    return (
        <>
           <div className="row">
    <div className="col-md-6 offset-md-3"> {/* Utilisez offset-md-3 pour centrer */}
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="wizard-content text-center">     
                <div className="inscription">
                    <h3>S'inscrire</h3>
                       </div>
                       <br/>
                    <div className="logo-container">
                        <img className="logoYalla" src="/src/assets/images/yallalogo.png" alt="Logo" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
   <div className="row justify-content-center">
                <div className="col-md-6 text--center"> {/* Utilisez col-md-6 pour aligner à gauche */}
                    <button className="buttonCrea" type="button">
                    <Link to="/preInscri" className="dropdown-toggle">
                    <span className="mtext">Créateur</span>
                    </Link>
                    </button>
                    <p className="choix text-center"> Ou bien</p>
                    <button className="buttonEtud" type="button">            
                    <Link to="/preInscriEtud" className="dropdown-toggle">
                    <span className="mtext">Etudiant</span>
                    </Link></button>
                </div>
                <div className="col-md-6"> {/* Utilisez col-md-6 pour aligner à gauche */}
                    <div className="cardEtudp">
                        <div className="card-body-Etud">
                            <form className="tab-wizard wizard-circle wizard">
                                <div className="input-group">
                                    <button className="buttonText">
                                        <span className="text">+ 216</span>
                                    </button>
                                    <input type="tel" className="NumTel" placeholder="Numéro de téléphone" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="email" className="email" placeholder="Email" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faAt} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="text" className="password" placeholder="Mot de passe" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="text" className="Cpassword" placeholder="Confirmer" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="checkbox" className="checkConditions" required/>
                                    <label className="conditions">J'accepte  
                                    <a href="/src/assets/politique/Politique-de-confidentialite-type_FR.pdf" target="_blank" rel="noopener noreferrer">
                                        <strong> les conditions générales d'utilisation</strong>
                                    </a>
                                </label>
                                </div>
                                <div className="action-btns">
                                    <button type="submit" className="btnInscri" disabled>Pré-Inscrit gratuitement</button>
                                    <span className="compteExist">Avez-vous déjà un compte ?</span>
                                    <button type="button" className="btnConnexion">
                                    <Link to="/connexion" className="dropdown-toggle">
                                    <span className="mtext">Se connecter</span>
                                    </Link>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default preInscriEtud;
