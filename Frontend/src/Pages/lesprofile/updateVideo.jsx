import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link depuis react-router-dom


const UpdateVideo = () => {
    const { id } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const [alert, setAlert] = useState(null);
    const [uploadDate, setUploadDate] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [error,setError]=useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/video/${id}`);
                setVideoData(response.data);
                setEditedData({ ...response.data });
                // Initialiser la date avec la date actuelle
                const currentDate = new Date().toISOString().slice(0, 10);
                setUploadDate(currentDate);
            } catch (error) {
                setError(error.response ? error.response.data.error : "Erreur lors de la récupération des données");
            }
        };

        fetchVideoData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };


    const handleUploadDateChange = (e) => {
        setUploadDate(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('video', selectedFile);
            }
            formData.append('titre', editedData.titre);
            formData.append('description', editedData.description);
            formData.append('date', uploadDate);
    
            const response = await axios.put(`http://localhost:3001/video/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Mettez à jour l'état de l'image mise à jour seulement si une nouvelle image est sélectionnée
            if (selectedFile) {
                setVideoData(response.data.video);
            } else {
                // Si aucune nouvelle image n'est sélectionnée, conservez l'image existante
                setVideoData(null);
            }
    
            // Affichez le message de succès avec le lien pour retourner à la page des vidéos
            setAlert(
                <div>
                    {response.data.message}. <Link to="/afvideo">Retour à la page des vidéos</Link>
                </div>
            );
            // Mettez à jour les données vidéo avec les nouvelles données retournées par le serveur
            setVideoData(response.data.updatedVideo);
        } catch (error) {
            setError(error.response ? error.response.data.error : "Erreur lors de la mise à jour des données ");
        }
    };

    return (
        <div className="inner-banner">
            <section className="w3l-breadcrumb">
                {alert && <div className="alert alert-success">{alert}</div>}
                {error && <p>{error}</p>}
                <div className="container">
                {videoData&&(  
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-7 d-flex justify-content-center align-items-center">
                            <div className="upload-container border rounded p-3">
                            <input type="file" name="video" onChange={handleFileChange} required />
                                <div className="additional-options-container border rounded p-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="titre"
                                        value={editedData?.titre || ''}
                                        onChange={handleInputChange}
                                    />
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        value={editedData?.description || ''}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={handleSubmit}className="white-text">Modifier</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <br />
            </section>
        </div>
    );
};

export default UpdateVideo;
