import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faAt, faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './preInscriEtud.css';

function PreInscriEtud() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [email, setEmail] = useState("");
    const [num, setNum] = useState("");
    const [niveau, setNiveau] = useState("");
    const [programme, setProgramme] = useState("");
    const [anniversaire, setAnniversaire] = useState(null);
    const [data, setData] = useState({});

    const handlePréInscriClick = () => {
        alert("Votre préinscription est en phase d'étude maintenant.");
    }


    useEffect(() => {
        axios.get('http://localhost:3001/preinscriEtudiant')
            .then(res => {
                setData(res.data[0]);
                // Convertir la date récupérée en utilisant Moment.js
                const formattedDate = res.data[0] ? moment(res.data[0].anniversaire).subtract(1, 'day').toDate() : null;
                setAnniversaire(formattedDate);
            })
            .catch(err => console.log(err));
    }, []);

    const handleUpload = (e) => {
        e.preventDefault(); // Empêcher le comportement par défaut du formulaire
        
        // Créer un objet contenant les données du formulaire
        const formData = {
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            email: email,
            num: num,
            niveau: niveau,
            programme: programme,
            anniversaire: anniversaire ? new Date(anniversaire.getTime() - anniversaire.getTimezoneOffset() * 60000).toISOString().split('T')[0] : null
        };

        // Envoyer les données au serveur
        axios.post('http://localhost:3001/preinscriEtudiant', formData)
            .then(res => {
                if (res.data.message === "Données insérées avec succès") {
                    console.log("Success");
                } else {
                    console.log("Failed");
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6 offset-md-3">
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
                <div className="col-md-6 text--center">
                    <button className="buttonCrea" type="button">
                        <Link to="/preInscri" className="dropdown-toggle">
                            <span className="mtext">Créateur</span>
                        </Link>
                    </button>
                    <p className="choix text-center"> Ou bien</p>
                    <button className="buttonEtud" type="button">            
                        <Link to="/preInscriEtud" className="dropdown-toggle">
                            <span className="mtext">Etudiant</span>
                        </Link>
                    </button>
                </div>
                <div className="col-md-6">
                    <div className="cardEtudp">
                        <div className="card-body-Etud">
                            <form className="tab-wizard wizard-circle wizard" onSubmit={handleUpload}>
                                <div className="input-group">
                                    <input type="text" className="nom" placeholder="Nom" name="nom" value={nom} onChange={(e) => setNom(e.target.value)}  required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="text" className="prenom" placeholder="Prenom" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="text" className="adresse" placeholder="Adresse" name="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <DatePicker
                                            className="form-control date-picker anniversaire"
                                            selected={anniversaire}
                                            onChange={(date) => setAnniversaire(date)}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Sélectionner une date"
                                            name="anniversaire"
                                            required
                                        />
                                    </span>
                                </div>
                                <div className="input-group">
                                    <button className="buttonText">
                                        <span className="text">+ 216</span>
                                    </button>
                                    <input type="tel" className="num" placeholder="Numéro de téléphone" name="num" value={num} onChange={(e) => setNum(e.target.value)} required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="email" className="email" name="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faAt} />
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Niveau:</label>
                                    <select className="niveau" name="niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)} required>
                                        <option value="vide">--</option>
                                        <option value="Avec Bac">Avec Bac</option>
                                        <option value="Sans Bac">Sans Bac</option>
                                    </select>
                                </div>                               
                                <div className="form-group">
                                    <label>Programme:</label>
                                    <select className="programme" name="programme"  value={programme} onChange={(e) => setProgramme(e.target.value)} required>
                                        <option value="vide">--</option>
                                        <option value="Complet">Complet</option>
                                        <option value="Accéléré">Accéléré</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <input type="checkbox" className="checkConditions" required/>
                                    <label className="conditions">J'accepte
                                        <a href="/src/assets/politique/Politique-de-confidentialite-type_FR.pdf" target="_blank" rel="noopener noreferrer">
                                            <strong>les conditions générales d'utilisation</strong>
                                        </a>
                                    </label>
                                </div>
                                <div className="action-btns">
                <button type="submit" className="btnInscri" onClick={handlePréInscriClick}>Pré-Inscrit gratuitement</button>
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

export default PreInscriEtud;