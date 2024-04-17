import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './imageuplod.css';

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState({});
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        numero: '',
        lienFace: '',
        lienInsta: '',
        lienTik: '',
        Domaine: '',
        nbFollowers: '',
        description: ''
    });
    const [profileData, setProfileData] = useState(null);
    const [domaines, setDomaines] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);

    const fetchData = async () => {
        try {
            const [domainesResponse, createurResponse] = await Promise.all([
                axios.get('http://localhost:3001/domaine'),
                axios.get('http://localhost:3001/createur')
            ]);
            setDomaines(domainesResponse.data);
            setData(createurResponse.data[0]);
            setProfileData(createurResponse.data[0]);
            setFormData(createurResponse.data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setShowModal(false); // Nous masquons ensuite la modal de modification
        try {
            await updateProfileData(formData);
        } catch (error) {
            console.error('Error updating profile data:', error);
        }
    };

    const updateProfileData = async (formDataToUpdate) => {
        try {
            const idCreateur = profileData && profileData.idCreateur;
            const formData = new FormData();
            formData.append('nom', formDataToUpdate.nom);
            formData.append('prenom', formDataToUpdate.prenom);
            formData.append('email', formDataToUpdate.email);
            formData.append('numero', formDataToUpdate.numero);
            formData.append('lienInsta', formDataToUpdate.lienInsta);
            formData.append('lienFace', formDataToUpdate.lienFace);
            formData.append('lienTik', formDataToUpdate.lienTik);
            formData.append('Domaine', formDataToUpdate.Domaine);
            formData.append('nbFollowers', formDataToUpdate.nbFollowers);
            formData.append('description', formDataToUpdate.description);
            if (file) {
                formData.append('photo', file);
            }
            const response = await axios.put(`http://localhost:3001/createur/${idCreateur}`, formData);
            if (response.status === 200) {
                setProfileData(formDataToUpdate);
                alert("Champs mis à jour avec succès!");
            } else {
                alert("Erreur lors de la mise à jour des champs!");
            }
        } catch (error) {
            console.error('Error updating profile data:', error);
            throw error;
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
            const response = await axios.post('http://localhost:3001/createur', formData);
            if (response.data.status === "Success") {
                alert("Image téléchargée avec succès!");
            } else {
                alert("Échec du téléchargement de l'image!");
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleEditProfile = () => {
        setShowModal(true);
    };

    return (
        <div className="inner-banner">
            <section className="w3l-breadcrumb">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 d-flex justify-content-center align-items-center">
                            <div style={{ position: "relative", width: "300px", height: "300px", overflow: "hidden", borderRadius: "50%", display: "inline-block", border: "8px solid #70218f" }}>
                                <img src={"http://localhost:3001/photo/" + (data && data.image)} alt="" style={{ maxWidth: "100%", height: "auto", borderRadius: "50%" }} />
                            </div>
                            <FontAwesomeIcon 
                                icon={faPlus} onClick={handleClick}
                                style={{ position: "absolute", top: "50%", left: "50%",
                                transform: "translate(450%, 450%)", cursor: "pointer", zIndex: "1",
                                backgroundColor: "#70218f", borderRadius: "50%", fontSize: "26px" }} />
                        </div>
                        <div className="col-lg-5">
                            <div className="text-right">
                                <h2>{profileData && profileData.nom}</h2>
                                <p>{profileData && profileData.description}</p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="custom-block-icon-wrap">
                                <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFile} />
                                <button onClick={handleUpload} style={{ marginTop: "5px", marginBottom: "5px" }}>Envoyer</button>
                            </div>
                        </div>
                        <div className="col-lg-5 d-flex justify-content-end align-items-end">
                            <div className="additional-button-div" style={{ position: "absolute", bottom: "0", right: "0" }}>
                                <button style={{ marginTop: "5px", marginBottom: "5px" }} onClick={handleEditProfile}>Modifier le profile</button>
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
                                <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleFormChange} className="large-input" />
                            </div>
                            <div className="form-row">
                                <label htmlFor="email">Email :</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} className="large-input" />
                            </div>
                            <div className="form-row">
                                <label htmlFor="numero"> Numéro de téléphone :</label>
                                <input type="tel" id="numero" name="numero" value={formData.numero} onChange={handleFormChange} className="large-input" />
                            </div>
                            <div className="form-row">
                                <label htmlFor="instagram"> Lien Instagram :</label>
                                <input type="text" id="instagram" name="lienInsta" value={formData.lienInsta} onChange={handleFormChange} className="large-input" />
                            </div>
                            <div className="form-row">
                                <label htmlFor="facebook"> Lien Facebook :</label>
                                <input type="text" id="facebook" name="lienFace" value={formData.lienFace} onChange={handleFormChange} className="large-input" />
                            </div>
                            <div className="form-row">
                                <label htmlFor="tiktok">Lien TikTok :</label>
                                <input type="text" id="tiktok" name="lienTik" value={formData.lienTik} onChange={handleFormChange} className="large-input" />
                            </div>
                            <div className="form-row">
                                <label htmlFor="selectDomaine"> Domaine de création : </label>
                                <select id="selectDomaine" name="Domaine" value={formData.Domaine} onChange={handleFormChange} className="large-input">
                                    <option value="">Sélectionner un domaine</option>
                                    {domaines.map((domaine, index) => (
                                        <option key={index} value={domaine.nomDomaine}>{domaine.nomDomaine}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <label htmlFor="followers"> Nombre de followers </label>
                                <input type="text" id="followers" name="nbFollowers" value={formData.nbFollowers} onChange={handleFormChange} className="large-input" />
                            </div>
                            <div className="form-row">
                                <label htmlFor="description"> Biographie </label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleFormChange} rows="5" cols="50" />
                            </div>
                            <button type="submit">Modifier</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
