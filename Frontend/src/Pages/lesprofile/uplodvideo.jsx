import React, { useState, useEffect } from 'react';
import './videoupload.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UploadVideo() {
    const idCreateur = localStorage.getItem('userId'); // Récupère l'ID du créateur depuis le stockage local
    const [videos, setVideos] = useState([]);
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [alert, setAlert] = useState('');

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail'); // Récupère l'email du créateur depuis le stockage local

        // Faire une requête au backend pour obtenir les vidéos du créateur
        axios.get(`http://localhost:3001/video/${idCreateur}`, {
            params: {
                email: userEmail
            }
        })
        .then(res => {
            setVideos(res.data);
        })
        .catch(err => console.log(err));
    }, []); // Run only once when the component mounts

    const handleFileChange = (e) => {
        // Logic for handling file change
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleUpload = () => {
        // Logic for uploading video
        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("titre", titre);
        formData.append("description", description);
        formData.append("date", uploadDate);
        formData.append("userId", idCreateur); // Utilise directement l'ID du créateur

        axios.post(`http://localhost:3001/video/${idCreateur}`, formData)
        .then(res => {
            if (res.data.message === "Données insérées avec succès") {
                console.log("Successed");
                setAlert(
                    <div>
                        La vidéo est bien enregistrée. <Link to="/afvideo">Retour à la page des vidéos</Link>
                    </div>
                );
                // Effacer l'alerte après quelques secondes
                setTimeout(() => {
                    setAlert('');
                }, 3000);
                // Réinitialiser les champs après le téléchargement réussi
                setTitre('');
                setDescription('');
                setUploadDate('');
            } else {
                console.log("Failed");
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="inner-banner">
            <section className="w3l-breadcrumb">
                {/* Affiche l'alerte si elle est définie */}
                {alert && <div className="alert alert-success">{alert}</div>}
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-7 d-flex justify-content-center align-items-center">
                            <div className="upload-container border rounded p-3">
                                <input type="file" id="video" name="video" onChange={handleFileChange} />
                                <div className="additional-options-container border rounded p-3">
                                    <input
                                        type="text"
                                        placeholder="Titre"
                                        name="titre"
                                        value={titre}
                                        onChange={(e) => setTitre(e.target.value)}
                                        className="form-control mb-3"
                                    />
                                    <textarea
                                        placeholder="Description"
                                        name="description"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        className="form-control mb-3"
                                    />
                                    <button onClick={handleUpload} className="white-text">Télécharger</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                {/* Afficher les vidéos du créateur */}
                {videos.map((video, index) => (
                    <div key={index}>
                        {/* Afficher les détails de la vidéo */}
                        <p>{video.titre}</p>
                        <p>{video.description}</p>
                        {/* Ajouter un lecteur vidéo si nécessaire */}
                    </div>
                ))}
            </section>
        </div>
    );
}

export default UploadVideo;
