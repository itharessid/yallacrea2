import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import './imageuplod.css';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Khouava from '../avatar/khouava'; // Assurez-vous d'importer votre composant avatar
import './ave.css'

// Function to format the date
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function ImageUpload() {
    const idCreateur = localStorage.getItem('userId'); // Récupère l'ID du créateur depuis le stockage local
    const [file, setFile] = useState(null);
    const [data, setData] = useState({});
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        num: '',
        lienFace: '',
        lienInsta: '',
        lienTik: '',
        Domaine: '',
        nbFollowers: '',
        description: '',
        anniversaire: ''
    });
    const [profileData, setProfileData] = useState(null);
    const [domaines, setDomaines] = useState([]);
    const [anniversaire, setAnniversaire] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false); // État pour basculer l'affichage de l'avatar
    const fileInputRef = useRef(null);
    const userEmail = localStorage.getItem('userEmail');
    const navigate = useNavigate(); // Use navigate hook from react-router-dom

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Extract the creator ID from the URL
            const userId = window.location.pathname.split('/').pop();
            // Send an HTTP request to get the creator's information
            const response = await axios.get(`http://localhost:3001/createur/${userId}`);
            // Update profile data with the creator's information
            setProfileData(response.data);
            setFormData(response.data);
            setAnniversaire(response.data.anniversaire);
            setData(response.data);
            // Fetch domaines
            const domainesResponse = await axios.get('http://localhost:3001/domaines');
            setDomaines(domainesResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        if (name === 'anniversaire') {
            setAnniversaire(value);
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowModal(false);
        try {
            await updateProfileData(formData);
        } catch (error) {
            console.error('Error updating profile data:', error);
        }
    };

    const handleDateChange = (date) => {
        const formattedDate = date ? date.toISOString().split('T')[0] : null;
        setAnniversaire(formattedDate);
    };

    const updateProfileData = async (formDataToUpdate) => {
        try {
            const idCreateur = profileData && profileData.idCreateur;
            const response = await axios.put(`http://localhost:3001/createur/${idCreateur}`, formDataToUpdate);
            if (response.status === 200) {
                setProfileData(formDataToUpdate);
                alert("Champs mis à jour avec succès!");
            } else {
                alert("Erreur lors de la mise à jour des champs!");
            }
        } catch (error) {
            console.error('Error updating profile data:', error);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Veuillez sélectionner un fichier!");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('photo', file);
            const userId = window.location.pathname.split('/').pop();
            const response = await axios.put(`http://localhost:3001/createur/photo/${userId}`, formData);
            if (response.status === 200) {
                alert("Image téléchargée avec succès!");
                fetchData();
            } else {
                alert("Échec du téléchargement de l'image!");
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleVoirPhoto = () => {
        if (userEmail === 'khoubaib@tawa.digital') {
            navigate(`/profiluser/${idCreateur}`);
        } else {
            alert("Vous n'êtes pas autorisé à voir cette photo.");
        }
    };

    return (
        <div>
            <header id="site-header" className="fixed-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg stroke">
                        <h1>
                            <a className="navbar-brand" href="index.html">
                                <img className="img-fluid" src="src/assets/images/yallalogo.png" alt="" style={{ maxWidth: '100px' }} />
                            </a>
                        </h1>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-lg-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Acceuil <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="apropos">Apropos</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <Dropdown>
                                        <Dropdown.Toggle id="navbarDropdown">
                                            Formation
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="/Accelerer">Cours Accéléré</Dropdown.Item>
                                            <Dropdown.Item href="/complet">Cours Complet</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/createur">Créateur</a>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/profiluser/${idCreateur}`} className="nav-link">Mon Profil</Link> {/* Utilisez Link */}
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/afvideo">Vidéos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="contact">Contact</a>
                                </li>
                                <div className="search-right">
                                    <Link to={`/`} className="btn button-style">Sortir</Link> {/* Utilisez Link */}
                                </div>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>  
            <br/>
            <div className="inner-banner">
                <section className="w3l-breadcrumb">
                    <div className="container">
                        <div className="row">
                            {/* Afficher l'avatar si showAvatar est true */}
                            <div className="col-lg-7 d-flex justify-content-center align-items-center">
                                <Khouava />
                            </div>
                            {/* Informations du profil */}
                            <div className="col-lg-5 d-flex justify-content-center align-items-start" style={{ marginTop: '-50px' }}>
                                <div className="text-center">
                                    <h2>{profileData && profileData.nom} {profileData && profileData.prenom}</h2>
                                    <br/>
                                    <p style={{ textAlign: 'center', fontWeight: 'bold', color:'black' }}>{profileData && profileData.nbFollowers}</p>
                                    <p style={{ textAlign: 'left' }}>{profileData && profileData.description}</p>
                                    <p style={{ textAlign: 'left', fontWeight: 'bold' }}>Email:
                                        <a href={`mailto:${profileData && profileData.email}`}>{profileData && profileData.email}</a>
                                    </p>
                                    <p style={{ textAlign: 'left', fontWeight: 'bold' }}>Adresse:</p>
                                    <p style={{ textAlign: 'left' }}>{profileData && profileData.adresse}</p>
                                    <p style={{ textAlign: 'left', fontWeight: 'bold' }}>Lien Instagram:
                                        <a href={profileData && profileData.lienInsta}>{profileData && profileData.lienInsta}</a>
                                    </p>
                                    <p style={{ textAlign: 'left', fontWeight: 'bold' }}>Lien Facebook:
                                        <a href={profileData && profileData.lienFace}>{profileData && profileData.lienFace}</a>
                                    </p>
                                    <p style={{ textAlign: 'left', fontWeight: 'bold' }}>Lien TikTok:
                                        <a href={profileData && profileData.lienTik}>{profileData && profileData.lienTik}</a>
                                    </p>
                                    <p style={{ textAlign: 'left' }}>{profileData && profileData.domaine}</p>
                                    <br/>
                                    <br/>
                                </div>
                            </div>
                            {/* Boutons */}
                            <div className="col-lg-5 d-flex justify-content-end align-items-">
                                <div className="additional-button-div" style={{ position: "absolute", bottom: "0", right: "100px" }}>
                                </div>
                                <div className="avatar-button-container">
                                    <button onClick={handleVoirPhoto} className="white-textr">Voir photo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Modal de modification du profil */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <form onSubmit={handleFormSubmit} className="white-text">
                                <h2>Modifier le profil</h2>
                                <label>
                                    Nom:
                                    <input type="text" name="nom" value={formData.nom} onChange={handleFormChange} />
                                </label>
                                <label>
                                    Prenom:
                                    <input type="text" name="prenom" value={formData.prenom} onChange={handleFormChange} />
                                </label>
                                <label>
                                    Email:
                                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} />
                                </label>
                                <label>
                                    Numéro de téléphone:
                                    <input type="text" name="num" value={formData.num} onChange={handleFormChange} />
                                </label>
                                <label>
                                    Lien Facebook:
                                    <input type="text" name="lienFace" value={formData.lienFace} onChange={handleFormChange} />
                                </label>
                                <label>
                                    Lien Instagram:
                                    <input type="text" name="lienInsta" value={formData.lienInsta} onChange={handleFormChange} />
                                </label>
                                <label>
                                    Lien TikTok:
                                    <input type="text" name="lienTik" value={formData.lienTik} onChange={handleFormChange} />
                                </label>
                                <label>
                                    Domaine:
                                    <select name="Domaine" value={formData.Domaine} onChange={handleFormChange}>
                                        {domaines.map((domaine) => (
                                            <option key={domaine} value={domaine}>
                                                {domaine}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    Nombre de Followers:
                                    <input type="text" name="nbFollowers" value={formData.nbFollowers} onChange={handleFormChange} />
                                </label>
                                <label>
                                    Description:
                                    <textarea name="description" value={formData.description} onChange={handleFormChange} />
                                </label>
                                <label>
                                    Anniversaire:
                                    <DatePicker 
                                        selected={anniversaire ? new Date(anniversaire) : null}
                                        onChange={handleDateChange} 
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Sélectionnez une date"
                                    />
                                </label>
                                <button type="submit">Enregistrer</button>
                                <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageUpload;
