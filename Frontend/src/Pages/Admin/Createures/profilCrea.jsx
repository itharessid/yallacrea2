import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import { useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import axios from 'axios'; 
import './profilCrea.css';

function ProfileCrea() {
    const { id } = useParams(); 
    const [createurData, setCreateurData] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [updatedPhoto, setUpdatedPhoto] = useState(null);
    const [domainesList, setDomainesList] = useState([]);
    
    useEffect(() => {
        const fetchCreateurData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/createur/${id}`);
                setCreateurData(response.data);
                setEditedData({ ...response.data });
            } catch (error) {
                setError(error.response ? error.response.data.error : "Erreur lors de la récupération des données de créateur");
            }
        };

        const fetchDomainesList = async () => {
            try {
                const response = await axios.get('http://localhost:3001/domaine');
                setDomainesList(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des domaines:', error);
            }
        };

        fetchCreateurData();
        fetchDomainesList();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };
    const handleDateChange = (date) => {
        setEditedData({ ...editedData, anniversaire: date });
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
            formData.append("nom", editedData.nom);
            formData.append("prenom", editedData.prenom);
            formData.append("adresse", editedData.adresse);
            formData.append("email", editedData.email);
            formData.append("numero", editedData.numero);
            formData.append("anniversaire", editedData.anniversaire); 
            formData.append("lienInsta", editedData.lienInsta);
            formData.append("lienFace", editedData.lienFace);
            formData.append("lienTik", editedData.lienTik);
            formData.append("domaine", editedData.domaine); 
            formData.append("nbFollowers", editedData.nbFollowers);
            formData.append("description", editedData.description);
    
            const response = await axios.put(`http://localhost:3001/createur/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (selectedFile) {
                setUpdatedPhoto(response.data.photo);
            } else {
                setUpdatedPhoto(null);
            }
    
            setCreateurData({ ...editedData, photo: response.data.photo });
        } catch (error) {
            setError(error.response ? error.response.data.error : "Erreur lors de la mise à jour des données de créateur");
        }
    };

    return (
        <div>
            <Adminsidbar />
            <div className="main-container">
                {error && <p>{error}</p>}
                {createurData && (
                    <div className="profile-container">
                        <img 
                            src={`http://localhost:3001/photo/${updatedPhoto || createurData.image}`} 
                            alt="Photo de profil" 
                            style={{ maxWidth: '200px', maxHeight: '200px' }} 
                        />
                        <br/>
                        <br/>
                        <h2>{createurData.nom} {createurData.prenom}</h2>
                        <br/>
                        <p>Email: {createurData.email}</p>
                        <p>Numéro: {createurData.numero}</p>
                        <p>Domaine: {createurData.domaine}</p>
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
                                    name="numero"
                                    value={editedData.numero}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date de naissance:</label>
                                <DatePicker
                                    className="form-control"
                                    selected={editedData.anniversaire}
                                    onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy" // Format de date jj/mm/année
                                />
                            </div>
                            <div className="form-group">
                                <label>Lien Instagram:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lienInsta"
                                    value={editedData.lienInsta}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Lien Facebook:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lienFace"
                                    value={editedData.lienFace}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Lien TikTok:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lienTik"
                                    value={editedData.lienTik}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Domaine:</label>
                                <select 
                                    className="custom-select form-control" 
                                    required 
                                    value={editedData.domaine} 
                                    onChange={(e) => setEditedData({ ...editedData, domaine: e.target.value })}
                                >
                                    <option value=""> --</option>
                                    {domainesList.map((domaine) => (
                                        <option key={domaine.id} value={domaine.id}>{domaine.nomDomaine}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Nombre de Followers:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="nbFollowers"
                                    value={editedData.nbFollowers}
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
                                <label>Photo:</label>
                                <input type="file" name="photo" onChange={handleFileChange} required />
                            </div>
                            <Link to="/createures" onClick={handleSubmit} className="btn btn-primary" style={{ backgroundColor: 'purple' }}> Enregistrer</Link> 
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileCrea;
