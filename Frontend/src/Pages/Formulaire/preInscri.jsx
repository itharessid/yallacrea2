import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faPhone, faAt, faLock, faLink } from '@fortawesome/free-solid-svg-icons'; // Importez les icônes nécessaires

import './preInscri.css';

function PreInscri() {
    const [selectedDate, setSelectedDate] = useState(null); // Définition de l'état pour la date sélectionnée

    return (
        <>
           <div className="row">
    <div className="col-md-6 offset-md-3"> {/* Utilisez offset-md-3 pour centrer */}
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="wizard-content text-center"> 
                    
                    <h3>S'inscrire</h3><br/>
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
                    <button className="buttonCrea" type="button">Créateur</button>
                    <p className="choix text-center"> Ou bien</p>
                    <button className="buttonEtud" type="button">Eudiant</button>
                </div>
                <div className="col-md-6"> {/* Utilisez col-md-6 pour aligner à gauche */}
                    <div className="cardEtud">
                        <div className="card-body-Etud">
                            <form className="tab-wizard wizard-circle wizard">
                                <div className="input-group">
                                    <button className="buttonText">
                                        <FontAwesomeIcon icon={faFlag} className="flag-icon" />
                                        <span className="text">+ 216</span>
                                    </button>
                                    <input type="tel" className="NumTele" placeholder="Numéro de téléphone" required/>
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
                                    <input type="lien" className="lienInsta" placeholder="Lien Instagram" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faLink} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="lien" className="lienFacebook" placeholder="Lien Facebook" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faLink} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="lien" className="lienTikTok" placeholder="Lien TikTok" required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faLink} />
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
                                <div className="input-group text--center"> {/* Utilisez col-md-6 pour aligner à gauche */}
                                <button className="buttonPreInscri" type="button">Pré-Inscrire gratuitement</button><br/>
                                <p className="choix1 text-center">Avez-vous déjà un compte ?</p><br/>
                                <button className="buttonConnexion" type="button">Se Connecter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PreInscri;
