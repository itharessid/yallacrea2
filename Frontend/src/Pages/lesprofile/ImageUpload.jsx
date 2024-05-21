import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import './imageuplod.css';
import { Link } from 'react-router-dom';


// Fonction pour formater la date
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function ImageUpload() {
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
    const fileInputRef = useRef(null);
    const userEmail = localStorage.getItem('userEmail');
    console.log("User Email:", userEmail);



   
    useEffect(() => {
        fetchData();
        const userEmail = localStorage.getItem('userEmail'); // Récupérez l'e-mail stocké dans le localStorage
        // Autres actions à effectuer avec l'e-mail...
    }, []);


    const fetchData = async () => {
        try {
            // Extraire l'ID du créateur à partir de l'URL
            const userId = window.location.pathname.split('/').pop();
            // Envoyer une requête HTTP pour obtenir les informations du créateur
            const response = await axios.get(`http://localhost:3001/createur/${userId}`);
            // Mettre à jour les données du profil avec les informations du créateur
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

    const handleFile = (event) => {
        setFile(event.target.files[0]);
        handleUpload(); // Ajoutez cet appel pour déclencher le téléchargement de l'image lorsque vous sélectionnez un fichier
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
            const userId = window.location.pathname.split('/').pop(); // Extraire l'ID de l'utilisateur à partir de l'URL
            console.log("User ID: ", userId); // Ajoutez cette ligne pour vérifier l'ID utilisateur
            const response = await axios.put(`http://localhost:3001/createur/photo/${userId}`, formData); // Mise à jour de l'URL pour inclure l'ID de l'utilisateur
            console.log("Response: ", response); // Ajoutez cette ligne pour vérifier la réponse
            if (response.status === 200) {
                alert("Image téléchargée avec succès!");
                fetchData(); // Rafraîchir les données après le téléchargement de l'image
            } else {
                alert("Échec du téléchargement de l'image!");
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleClick = () => {
        setShowPhotoModal(true);
    };

    const handleEditProfile = () => {
        setShowModal(true);
    };

    const handleVoirPhoto = () => {
        // Action pour "Voir Photo"
        setShowPhotoModal(false);
        alert("Voir Photo action");
    };
    const handleNonAuthorized = () => {
        // Logique à exécuter lorsque l'utilisateur n'est pas autorisé
        alert("Vous n'êtes pas autorisé à voir cet avatar.");
    };
    
    const handleVoirAvatar = () => {
        console.log("Inside handleVoirAvatar");
        if (userEmail === 'khoubaib@tawa.digital') {
            console.log("User is authorized. Opening link...");
            return <Link to="/khav"  className="white-textee">Voir Avatar</Link>;
        } else {
            console.log("User is not authorized.");
            return <button onClick={handleNonAuthorized}>Vous n'avez pas un avatar.</button>;
        }
    };
    
    
    
    
    
    

    return (
        <div className="inner-banner">
            <section className="w3l-breadcrumb">
                <div className="container">
                    <div className="row">
                        {/* Formulaire de mise à jour de l'image */}
                        <div className="col-lg-7 d-flex justify-content-center align-items-center">
                            <div style={{ position: "relative", width: "300px", height: "300px", overflow: "hidden", borderRadius: "50%", display: "inline-block", border: "8px solid #70218f" }}>
                                <img src={"http://localhost:3001/photo/" + (data && data.image)} alt="" style={{ maxWidth: "100%", height: "auto", borderRadius: "50%" }} />
                            </div>
                            <FontAwesomeIcon 
                                icon={faPlus} onClick={() => fileInputRef.current.click()}
                                style={{ position: "absolute", top: "50%", left: "50%",
                                transform: "translate(450%, 450%)", cursor: "pointer", zIndex: "1",
                                backgroundColor: "#70218f", borderRadius: "50%", fontSize: "26px" }} className="white-text"/>
                            <FontAwesomeIcon 
                                icon={faUserCircle} onClick={handleClick}
                                style={{ position: "absolute", top: "30%", left: "47%",
                                transform: "translate(600%, 550%)", cursor: "pointer", zIndex: "1",
                                backgroundColor: "#70218f", borderRadius: "50%", fontSize: "26px" }} className="white-text"/>
                        </div>
                        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFile} />
                
                        <div className="col-lg-7">
                            <div className="custom-block-icon-wrap">
                            <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFile} />
                            </div>
                        </div>

                        {/* Informations du profil */}
                        <div className="col-lg-5 d-flex justify-content-center align-items-start" style={{ marginTop: '-250px' }}>
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
                            </div>
                        </div>

                        {/* Bouton pour éditer le profil */}
                        <div className="col-lg-5 d-flex justify-content-end align-items-">
                            <div className="additional-button-div" style={{ position: "absolute", bottom: "0", right: "0" }}>
                                <button style={{ marginTop: "5px", marginBottom: "5px" ,marginRight:"-500px"}} onClick={handleEditProfile} className="white-text">Modifier le profil</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showModal && (
                <div className="modale">
                    <div className="modal-contente">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <form onSubmit={handleFormSubmit} className="form">
                            <div className="form-row">
                                <label htmlFor="nom">Nom :</label>
                                <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleFormChange} className="large-input" style={{ marginLeft: '10px' }} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="prenom">Prénom :</label>
                                <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleFormChange} className="large-input" style={{ marginLeft: '10px' }} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="email">Email :</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} className="large-input" style={{ marginLeft: '10px' }} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="num">Numéro de téléphone :</label>
                                <input type="tel" id="num" name="num" value={formData.num} onChange={handleFormChange} className="large-input" style={{ marginLeft: '10px' }} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="lienFace">Lien Facebook :</label>
                                <input type="url" id="lienFace" name="lienFace" value={formData.lienFace} onChange={handleFormChange} className="large-input" style={{ marginLeft: '10px' }} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="lienInsta">Lien Instagram :</label>
                                <input type="url" id="lienInsta" name="lienInsta" value={formData.lienInsta} onChange={handleFormChange} className="large-input" style={{ marginLeft: '10px' }} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="lienTik">Lien TikTok :</label>
                                <input type="url" id="lienTik" name="lienTik" value={formData.lienTik} onChange={handleFormChange} className="large-input" style={{ marginLeft: '10px' }} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="Domaine">Domaine :</label>
                                <select id="Domaine" name="Domaine" value={formData.Domaine} onChange={handleFormChange} className="large-input" style={{ marginLeft: '10px' }}>
                                    <option value="">Sélectionner un domaine</option>
                                    {domaines.map((domaine, index) => (
                                        <option key={index} value={domaine.nom}>{domaine.nom}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <label htmlFor="nbFollowers">Nombre de followers :</label>
                                <input type="number" id="nbFollowers" name="nbFollowers" value={formData.nbFollowers} onChange={handleFormChange} className="large-input" style={{ marginLeft: '10px' }} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="description">Description :</label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleFormChange} className="large-input" style={{ marginLeft: '10px' }} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="anniversaire">Anniversaire :</label>
                                <DatePicker
                                    selected={anniversaire ? new Date(anniversaire) : null}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="large-input"
                                    style={{ marginLeft: '10px' }}
                                />
                            </div>
                            <div className="form-row">
                                <button type="submit" className="white-text">Mettre à jour</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showPhotoModal && (
    <div className="photo-modal-overlay">
        <div className="photo-modal-content">
            <span className="close" onClick={() => setShowPhotoModal(false)}>&times;</span>
            <div>
            {handleVoirAvatar()}
        </div>
        </div>
    </div>
)}
        </div>
    );
}

export default ImageUpload;
