import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import { useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import axios from 'axios'; 
import './event.css';

function Event(){
    const { id } = useParams(); 
    const [eventData, setEventData] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [updatedPhoto, setUpdatedPhoto] = useState(null);
    const [dateevent, setDatevent] = useState(new Date()); //

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/evenements/${id}`);
                setEventData(response.data);
                setEditedData({ ...response.data });
    
                // Mettre à jour la date de naissance dans le state
                setDatevent(new Date(response.data.dateevent));
            } catch (error) {
                setError(error.response ? error.response.data.error : "Erreur lors de la récupération des données de l'évènement");
            }
        };

        fetchEventData();
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
            const formData = new FormData();
            if (selectedFile) {
                formData.append('photo', selectedFile);
            }
            // Ajout des autres champs du formulaire
            formData.append("titre", editedData.titre);
            formData.append("description", editedData.description);
            formData.append("lienphotos", editedData.lienphotos);
            formData.append("lienvideo", editedData.lienvideo);
            formData.append("dateevent", formatDate(dateevent)); // Utiliser la fonction formatDate

    
            const response = await axios.put(`http://localhost:3001/evenements/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (selectedFile) {
                setUpdatedPhoto(response.data.photo);
            } else {
                setUpdatedPhoto(null);
            }
    
            // Mettre à jour les données après la mise à jour réussie
            setEventData({ ...editedData, photo: response.data.photo });
            // Mettre à jour les données éditées également si nécessaire
            setEditedData({ ...editedData, photo: response.data.photo });
        } catch (error) {
            setError(error.response ? error.response.data.error : "Erreur lors de la mise à jour des données de l'évènement");
        }
    };

    // Fonction pour formater la date au format "YYYY-MM-DD"
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
   
    return(
        <div>
            <Adminsidbar />
            <div className="main-container">
                {error && <p>{error}</p>}
                {eventData && (
                    <div className="profile-container">
                       <img 
    src={`http://localhost:3001/photo/${eventData.image}`}
    alt="Photo de profil" 
    style={{ maxWidth: '200px', maxHeight: '200px' }} 
/>
                        <br/>
                        <br/>
                        <h2>{eventData.titre}</h2>
                        <br/>
                        <p>Description: {eventData.description}</p>

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
                                <label>lienphotos:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lienphotos"
                                    value={editedData.lienphotos}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>lienvideo:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lienvideo"
                                    value={editedData.lienvideo}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date:</label>
                                <DatePicker
                                    className="form-control"
                                    selected={dateevent}
                                    onChange={(date) => setDatevent(date)}
                                    dateFormat="dd/MM/yyyy" // Format de date
                                />
                            </div>

                            <div className="form-group">
                                <label>Photo:</label>
                                <input type="file" name="photo" onChange={handleFileChange} required />
                            </div>
                            <Link to="/evenements" onClick={handleSubmit} className="btn btn-primary" style={{ backgroundColor: 'purple' }}> Enregistrer</Link> 
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Event;
