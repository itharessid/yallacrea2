import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Adminsidbar from '../Sidbar/Adminsidbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './profilexpert.css'

function ProfileExperts() {
    const { id } = useParams(); // Récupérer l'ID de l'expert à partir de l'URL
    const [expertData, setExpertData] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [updatedPhoto, setUpdatedPhoto] = useState(null); // Nouvel état pour l'image mise à jour

    useEffect(() => {
        const fetchExpertData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/expert/${id}`);
                setExpertData(response.data);
                setEditedData({ ...response.data });
            } catch (error) {
                setError(error.response ? error.response.data.error : "Erreur lors de la récupération des données de l'expert");
            }
        };

        fetchExpertData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        try {
            // Vérifier si aucun fichier n'a été sélectionné
            if (!selectedFile) {
                alert("Veuillez sélectionner une nouvelle image pour mettre à jour.");
                return; // Arrêter l'exécution de la fonction
            }

            const formData = new FormData();
            formData.append('photo', selectedFile);
            formData.append('nom', editedData.nom);
            formData.append('prenom', editedData.prenom);
            formData.append('Email', editedData.Email);
            formData.append('telef', editedData.telef);
            formData.append('poste', editedData.poste);
    
            const response = await axios.put(`http://localhost:3001/expert/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Mettre à jour l'état de l'image mise à jour seulement si une nouvelle image est sélectionnée
            if (selectedFile) {
                setUpdatedPhoto(response.data.photo);
            } else {
                // Si aucune nouvelle image n'est sélectionnée, conservez l'image existante
                setUpdatedPhoto(null);
            }
    
            // Mettre à jour l'état expertData avec les nouvelles données de l'expert
            setExpertData({ ...editedData, photo: response.data.photo });
        } catch (error) {
            setError(error.response ? error.response.data.error : "Erreur lors de la mise à jour des données de l'expert");
        }
    };

    return (
        <>
            <Adminsidbar />
            <div className="main-container">
                {error && <p>{error}</p>}
                {expertData && (
                    <div className="profile-container">
                        <img 
                            src={`http://localhost:3001/photo/${updatedPhoto || expertData.photo}`} 
                            alt="Photo de profil" 
                            style={{ maxWidth: '200px', maxHeight: '200px' }} 
                        />
                        <br/>
                        <br/>
                        <h2>{expertData.nom} {expertData.prenom}</h2>
                        <br/>
                        <p>Email: {expertData.Email}</p>
                        <p>Numéro: {expertData.telef}</p>
                        <p>poste : {expertData.poste}</p>
                        
                        <form>
                            <div className="form-group">
                                <label>Nom:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nom"
                                    value={editedData.nom || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Prénom:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="prenom"
                                    value={editedData.prenom || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Email"
                                    value={editedData.Email || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Numéro:</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="telef"
                                    value={editedData.telef || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Poste:</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="poste"
                                    value={editedData.poste || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                         <label>Photo<span className="required"> </span>: </label>
                         <br />

                       <input type="file" name="photo" onChange={handleFileChange} required /></div>
                       
                            <Link to="/expert" onClick={handleSubmit} className="btn btn-primary" style={{ backgroundColor: 'purple' }}> Enregistrer</Link>                    
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProfileExperts;
