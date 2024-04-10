import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import { useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import axios from 'axios'; // Import d'axios

function Editemplois() {
    const { id } = useParams(); 
    const [EmploiData, setEmploiData] = useState(null); // Correction: Changement de createurData à EmploiData
    const [editedData, setEditedData] = useState(null); // Correction: Changement de createurData à editedData
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [updatedPhoto, setUpdatedPhoto] = useState(null);

    useEffect(() => {
        const fetchEmploiData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/emplois/${id}`);
                setEmploiData(response.data);
                setEditedData({ ...response.data });
            } catch (error) {
                setError("Erreur lors de la récupération des données");
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchEmploiData(); // Appel de la fonction fetchEmploiData ici
        
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('photo', selectedFile);
            }
            // Ajout des autres champs du formulaire
            formData.append("titre", editedData.titre);
            formData.append("description", editedData.description);
            formData.append("typedecour", editedData.typedecour);
            
            const response = await axios.put(`http://localhost:3001/emplois/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (selectedFile) {
                setUpdatedPhoto(response.data.photo);
            } else {
                setUpdatedPhoto(null);
            }
    
            setEditedData({ ...editedData, photo: response.data.photo });
            window.location.href = '/uploadE';
        } catch (error) {
            setError("Erreur lors de la mise à jour des données");
            console.error("Erreur lors de la mise à jour des données :", error);
        }
    };

    return (
        <div>
            <Adminsidbar />
            <div className="main-container">
                {error && <p>{error}</p>}
                {EmploiData && (
                    <div className="profile-container">
                        
                        <br/>
                        <br/>
                        <h2>{EmploiData.nom} {EmploiData.prenom}</h2>
                        <br/>
                        <p>Titre : {EmploiData.titre}</p>
                        <p>Description: {EmploiData.description}</p>
                        <p>Type de cours:  {EmploiData.typedecour}</p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Titre:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="titre"
                                    value={editedData.titre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={editedData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
    <label>Type de cours:</label>
    <select
        className="form-control"
        name="typedecour"
        value={editedData.typedecour}
        onChange={handleInputChange}
    >
        <option value="">Sélectionnez le type de cours</option>
        <option value="Présentiel">Cours Présentiel</option>
        <option value="enligne">Cours en ligne</option>
    </select>
</div>
                            <div className="form-group">
                                <label> Télécharger Emplois:</label>
                                <input 
                                    type="file" 
                                    className="form-control-file" 
                                    name="photo" 
                                    onChange={handleFileChange} 
                                />
                            </div>
                            <Link to="/uploadE" onClick={handleSubmit} className="btn btn-primary" style={{ backgroundColor: 'purple' }}> Enregistrer</Link> 
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Editemplois;
