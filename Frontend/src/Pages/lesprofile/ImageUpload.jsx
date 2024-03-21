import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './imageuplod.css';

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({ nom: '', description: '' });
    const [profileData, setProfileData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/text/des', formData)
            .then(res => {
                if (res.status === 200) {
                    alert("Description mise à jour avec succès!");
                    // Mettre à jour l'état local ou effectuer d'autres actions nécessaires
                } else {
                    alert("Erreur lors de la mise à jour de la description!");
                }
            })
            .catch(err => console.log(err));
        setShowModal(false);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Veuillez sélectionner un fichier!");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        axios.post('http://localhost:3001/upload', formData)
            .then(res => {
                if (res.data.status === "Success") {
                    alert("Image téléchargée avec succès!");
                } else {
                    alert("Échec du téléchargement de l'image!");
                }
            })
            .catch(err => console.log(err));
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleEditProfile = () => {
        setFormData({ nom: profileData.nom, description: profileData.description });
        setShowModal(true);
    };
    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setData(res.data[0]);
                setProfileData(res.data[0]); // Mise à jour de profileData avec les données récupérées
                setFormData({ nom: res.data[0].nom, description: res.data[0].description }); // Mise à jour de formData avec les données récupérées
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="inner-banner">
            <section className="w3l-breadcrumb">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 d-flex justify-content-center align-items-center">
                            <div style={{ position: "relative", width: "300px", height: "300px", overflow: "hidden", borderRadius: "50%", display: "inline-block", border: "8px solid #70218f" }}>
                                <img src={"http://localhost:3001/images/" + data.image} alt="" style={{ maxWidth: "100%", height: "auto", borderRadius: "50%" }} />
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
                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="nom">Nom</label>
                            <div className="form-group">
                                <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleFormChange} className="large-input" />
                            </div>
                            <label htmlFor="bio">Biographie</label>
                            <div className="form-group">
                                <textarea id="bio" name="description" value={formData.description} onChange={handleFormChange} rows="5" cols="50" />
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
