import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Adminsidbar from '../Sidbar/Adminsidbar';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ProfilePartenaire() {
    const { id } = useParams();
    const [partenaireData, setPartenaireData] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [updatedPhoto, setUpdatedPhoto] = useState(null);

    useEffect(() => {
        const fetchPartenaireData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/partenaire/${id}`);
                setPartenaireData(response.data);
                setEditedData({ ...response.data });
            } catch (error) {
                setError(error.response ? error.response.data.error : "Erreur lors de la récupération des données du partenaire");
            }
        };

        fetchPartenaireData();
    }, [id]);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('photo', selectedFile);
            }
            formData.append('nomSociete', editedData.nomSociete);
            formData.append('numero', editedData.numero);
            formData.append('email', editedData.email);

            const response = await axios.put(`http://localhost:3001/partenaire/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (selectedFile) {
                setUpdatedPhoto(response.data.logo);
            } else {
                setUpdatedPhoto(null);
            }

            setPartenaireData({ ...editedData, logo: response.data.logo });
        } catch (error) {
            setError(error.response ? error.response.data.error : "Erreur lors de la mise à jour des données du partenaire");
        }
    };

    return (
        <>
            <Adminsidbar />
            <div className="main-container">
                <div className="profile-container">
                    <img 
                        src={partenaireData ? `http://localhost:3001/photo/${updatedPhoto || partenaireData.logo}` : ''} 
                        alt="Logo du partenaire" 
                        style={{ maxWidth: '200px', maxHeight: '200px' }} 
                    />
                    <br/>
                    <br/>
                    <h2>{partenaireData ? partenaireData.nomSociete : ''}</h2>
                    <br/>
                    <p>Email: {partenaireData ? partenaireData.email : ''}</p>
                    <p>Numéro: {partenaireData ? partenaireData.numero : ''}</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nom Société:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nomSociete"
                                value={editedData ? editedData.nomSociete : ''}
                                onChange={(e) => setEditedData({ ...editedData, nomSociete: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={editedData ? editedData.email : ''}
                                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Numéro:</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="numero"
                                value={editedData ? editedData.numero : ''}
                                onChange={(e) => setEditedData({ ...editedData, numero: e.target.value })}
                            />
                        </div>
                        
                      
                        <div className="form-group">
                            <label>Photo:</label>
                            <input
                                type="file"
                                className="form-control-file"
                                name="photo"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                            />
                        </div>
                        <Link to="/partenaire" onClick={handleSubmit} className="btn btn-primary" style={{ backgroundColor: 'purple' }}> Enregistrer</Link>                    
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProfilePartenaire;
