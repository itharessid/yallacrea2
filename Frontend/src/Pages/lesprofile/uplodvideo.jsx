import React, { useState, useEffect } from 'react';
import './videoupload.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UploadVideo() {
    const [data, setData] = useState({});
    const [videoFile, setVideoFile] = useState(null);
    const [uploadDate, setUploadDate] = useState('');
    const [titre,setTitre]=useState('');
    const [description, setDescription] = useState('');
    const [alert, setAlert] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/video')
        .then(res => {
            setData(res.data[0]);
        })
        .catch(err => console.log(err));
        // Set the current date as the upload date when the component mounts
        const currentDate = new Date().toISOString().slice(0, 10);
        setUploadDate(currentDate);
    }, []); // Run only once when the component mounts

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleUploadDateChange = (e) => {
        setUploadDate(e.target.value);
    }

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("titre", titre);
        formData.append("description", description);
        formData.append("date", uploadDate);

        axios.post('http://localhost:3001/video', formData)
        .then(res => {
            if (res.data.message === "Données insérées avec succès") {
                console.log("Successed");
                setAlert("Le vidéo est bien enregistré");
                // Efface l'alerte après quelques secondes
                setTimeout(() => {
                    setAlert('');
                }, 3000);
                // Réinitialise les champs après le téléchargement réussi
                setTitre('');
                setDescription('');
                setUploadDate('');
            } else {
                console.log("Failed");
            }
        })
        .catch(err => console.log(err));
    }


    const handleModification = () => {
        // Logic to handle modification action
    }

    return (
        <div className="inner-banner">
            <section className="w3l-breadcrumb">
            {/* Affiche l'alerte si elle est définie */}
            {alert && <div className="alert alert-success">{alert}</div>}
                <div className="container" >
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
                                    <button onClick={handleUpload} className="white-text">Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </section>
        </div>
    );
}

export default UploadVideo;
