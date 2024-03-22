import React, { useState } from 'react';
import './videoupload.css';

function UploadVideo() {
    const [videoFile, setVideoFile] = useState(null);
    const [description, setDescription] = useState('');
    const [uploadDate, setUploadDate] = useState('');

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
        // Logique pour gérer l'upload de la vidéo
    }

    const handleModification = () => {
        // Logique pour gérer l'action de modification
    }

    return (
        <div className="inner-banner">
    <section className="w3l-breadcrumb">
        <div className="container">
            <div className="row">
                <div className="col-lg-7 d-flex justify-content-center align-items-center">
                    <div className="upload-container border rounded p-3">
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload</button>
                        <div className="additional-options-container border rounded p-3">
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={handleDescriptionChange}
                                className="form-control mb-3"
                            />
                            <input
                                type="date"
                                placeholder="Date d'ajout"
                                value={uploadDate}
                                onChange={handleUploadDateChange}
                                className="form-control mb-3"
                            />
                            <button onClick={handleModification}>ajouter</button>
                            <button onClick={handleModification}>Modifier</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <br/>
    </section>
    <section className="card-section">
    <div className="container">
        <div className="row">
            <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <div className="cardv">
                    <video controls className="cardv-video">
                        <source src="url_de_la_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="description">
                        <div className="heading">Description de la vidéo</div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        </p>
                        <p>Date de publication: 21 mars 2024</p> {/* Exemple de date */}
                    </div>
                </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <div className="cardv">
                    <video controls className="cardv-video">
                        <source src="url_de_la_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="description">
                        <div className="heading">Description de la vidéo</div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        </p>
                        <p>Date de publication: 21 mars 2024</p> {/* Exemple de date */}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


</div>

    );
}

export default UploadVideo;
