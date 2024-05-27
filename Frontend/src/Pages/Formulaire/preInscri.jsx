import React, { useState, useEffect } from 'react';;
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faAt, faLock, faLink,faUser, faGlobe,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // Importez les icônes nécessaires
import { Link } from 'react-router-dom';
import './preInscri.css';
import axios from 'axios';
import moment from 'moment';


function PreInscri() {
    const [selectedDate, setSelectedDate] = useState(null); // Définition de l'état pour la date sélectionnée
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [email, setEmail] = useState("");
    const [num, setNum] = useState("");
    const [lienInsta, setLienInsta] = useState("");
    const [lienFace, setLienFace] = useState("");
    const [lienTik, setLienTik] = useState("");
    const [domaine, setDomaine] = useState("");
    const [anniversaire, setAnniversaire] = useState(null);
    const [data, setData] = useState({});

    
    const handlePréInscriClick = ({ addNotification }) => {
        alert("Votre préinscription est en phase d'étude maintenant.");
    }


    
    useEffect(() => {
        axios.get('http://localhost:3001/preinscriCrea')
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
            lienInsta: lienInsta,
            lienFace: lienFace,
            lienTik: lienTik,
            domaine: domaine,
            anniversaire: anniversaire ? new Date(anniversaire.getTime() - anniversaire.getTimezoneOffset() * 60000).toISOString().split('T')[0] : null
        };

        // Envoyer les données au serveur
        axios.post('http://localhost:3001/preinscriCrea', formData)
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
    <div className="col-md-6 offset-md-3"> {/* Utilisez offset-md-3 pour centrer */}
        <div className="pd-ltr-20 xs-pd-20-10">
            <div className="min-height-200px">
                <div className="wizard-content text-center"> 
                    
                <div className="inscription1">
                    <h3>S'inscrire</h3>
                       </div>
                       <br/>
                    <div className="logo-container">
                        <img className="logoYalla1" src="/src/assets/images/yallalogo.png" alt="Logo" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



            <div className="row justify-content-center">
                <div className="col-md-6 text--center"> {/* Utilisez col-md-6 pour aligner à gauche */}
                    <button className="buttonCre" type="button">
                    <Link to="/preInscri" className="dropdown-toggle">
                    <span className="mtext">Créateur</span>
                    </Link>
                    </button>
                    <p className="choix1"> Ou bien</p>
                    <button className="buttonEtud1" type="button">            
                    <Link to="/preInscriEtud" className="dropdown-toggle">
                    <span className="mtext">Etudiant</span>
                    </Link></button>
                </div>
                <div className="col-md-6"> {/* Utilisez col-md-6 pour aligner à gauche */}
                    <div className="cardCreap">
                        <div className="card-body-Crea">
                            <form className="tab-wizard wizard-circle wizard" onSubmit={handleUpload}>
                            <div className="input-group">
                                    <input type="text" className="nom" placeholder="Nom" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="text" className="prenom" placeholder="Prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required/>
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
                                    <input type="number" className="num" placeholder="Numéro de téléphone" value={num} onChange={(e) => setNum(e.target.value)} required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="email" className="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faAt} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="lien" className="lienInsta" placeholder="Lien Instagram" value={lienInsta} onChange={(e) => setLienInsta(e.target.value)}required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faLink} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="lien" className="lienFace" placeholder="Lien Facebook" value={lienFace} onChange={(e) => setLienFace(e.target.value)} required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faLink} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="lien" className="lienTik" placeholder="Lien TikTok" value={lienTik} onChange={(e) => setLienTik(e.target.value)} required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faLink} />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <input type="lien" className="domaine" placeholder="Domaine de création" value={domaine} onChange={(e) => setDomaine(e.target.value)}required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faGlobe} />
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
                <button type="submit" className="btnInscri" onClick={handlePréInscriClick}>Pré-Inscrit gratuitement</button>
                <span className="compteExist">Avez-vous déjà un compte ?</span>
                <button type="button" className="btnConnexion">
                    <Link to="/connexionc" className="dropdown-toggle">
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

export default PreInscri;
