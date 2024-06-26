import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import axios from 'axios'; 
import './profilEtud.css';

function ProfileEtud() {
    const { id } = useParams(); 
    const [etudiantData, setEtudiantData] = useState(null);
    const [editedData, setEditedData] = useState({
        nom: '',
        prenom: '',
        email: '',
        adresse: '',
        num: '',
        anniversaire: '', // Initialiser comme une chaîne vide
        niveau: '',
        programme: '',
        codePromo: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEtudiantData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/etudiant/${id}`);
                const data = response.data;
                data.anniversaire = convertDateToDMY(new Date(data.anniversaire)); // Convertir la date au format jour/mois/année
                setEtudiantData(data);
                setEditedData(data);
            } catch (error) {
                setError(error.response ? error.response.data.error : "Erreur lors de la récupération des données de l'étudiant");
            }
        };

        fetchEtudiantData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleDateChange = (date) => {
        const formattedDate = convertDateToDMY(date);
        setEditedData({ ...editedData, anniversaire: formattedDate });
    };

    const convertDateToDMY = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêcher le comportement par défaut du formulaire
        try {
            const response = await axios.put(`http://localhost:3001/etudiant/${id}`, editedData);
            setEtudiantData({ ...editedData }); // Mettre à jour l'état avec les données modifiées
            console.log(response.data); // Afficher la réponse de l'API (facultatif)
        } catch (error) {
            setError(error.response ? error.response.data.error : "Erreur lors de la mise à jour des données de l'étudiant");
        }
    };

    return (
        <div>
            <Adminsidbar />
            <div className="main-container">
                {error && <p>{error}</p>}
                {etudiantData && (
                    <div className="profile-container">
                        <br/>
                        <br/>
                        <h2>{etudiantData.nom} {etudiantData.prenom}</h2>
                        <br/>
                        <p>Email: {etudiantData.email}</p>
                        <p>Numéro: {etudiantData.num}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nom:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nom"
                                    value={editedData.nom}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Prénom:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="prenom"
                                    value={editedData.prenom}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={editedData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Adresse:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="adresse"
                                    value={editedData.adresse}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Numéro:</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="num"
                                    value={editedData.num}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date de naissance:</label>
                                <DatePicker
                                    className="form-control"
                                    selected={new Date(editedData.anniversaire.split('/').reverse().join('/'))}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="form-group">
                                <label>Niveau:</label>
                                <select 
                                    className="custom-select form-control" 
                                    name="niveau" 
                                    value={editedData.niveau} 
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="vide">--</option>
                                    <option value="Avec Bac">Avec Bac</option>
                                    <option value="Sans Bac">Sans Bac</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Programme:</label>
                                <select 
                                    className="custom-select form-control" 
                                    name="programme" 
                                    value={editedData.programme} 
                                    onChange={handleInputChange}
                                >
                                    <option value="vide">--</option>
                                    <option value="Complet">Complet</option>
                                    <option value="Accelere">Accéléré</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Code Promo:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="codePromo"
                                    value={editedData.codePromo}
                                    onChange={handleInputChange}
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

export default ProfileEtud;
