import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import axios from 'axios'; 
import './certif.css';

function ModifCertif() {
    const { idCertif } = useParams(); // Utilisation de "idCertif" pour récupérer le paramètre d'URL
    const [certifData, setCertifData] = useState(null);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date()); // Ajout de la variable d'état pour la date
    const [editedData, setEditedData] = useState({}); // Initialise editedData à un objet vide

    useEffect(() => {
        const fetchCertifData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/certif/${idCertif}`);
                setCertifData(response.data);
                setEditedData({ ...response.data });

                // Mettre à jour la date dans le state en tant qu'objet Date
                setDate(new Date(response.data.date));
            } catch (error) {
                setError(error.response ? error.response.data.error : "Erreur lors de la récupération des données");
            }
        };

        fetchCertifData();
    }, [idCertif]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        try {
            const response = await axios.put(`http://localhost:3001/certif/${idCertif}`, editedData);

            // Mettre à jour les données après la mise à jour réussie
            setCertifData({ ...editedData });
            // Mettre à jour les données éditées également si nécessaire
            setEditedData({ ...editedData });

            // Redirection vers la page de certificat
            window.location.href = '/certif';
        } catch (error) {
            setError(error.response ? error.response.data.error : "Erreur lors de la mise à jour des données");
        }
    };

    return (
        <div>
            <Adminsidbar />
            <div className="main-container">
                {error && <p>{error}</p>}
                {certifData && (
                    <div className="profile-container">
                        <h2>{certifData.formation}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>nom:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nom"
                                    value={editedData.nom || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>prenom:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="prenom"
                                    value={editedData.prenom || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Type:</label>
                                <select 
                                    className="custom-select form-control" 
                                    name="type" 
                                    value={editedData.type || ''} 
                                    onChange={handleInputChange} 
                                    required
                                >
                                    <option value="">--</option>
                                    <option value="Attestation">Attestation</option>
                                    <option value="Certificat">Certificat de réussite</option>
                                    <option value="Diplome">Diplome</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Formation:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="formation"
                                    value={editedData.formation || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Directeur:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="directeur"
                                    value={editedData.directeur || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date:</label>
                                <DatePicker
                                    className="form-control"
                                    selected={date}
                                    onChange={(date) => {
                                        setDate(date);
                                        setEditedData({ ...editedData, date: date.toISOString() }); // Mettre à jour la date dans editedData
                                    }} // Mettre à jour la variable d'état "date"
                                    dateFormat="dd/MM/yyyy" // Format de date jj/mm/aaaa
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'purple', color: 'white' }}>Enregistrer</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModifCertif;
