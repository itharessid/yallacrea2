// nvemplois.jsx

import React, { useState } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import axios from 'axios';

function nvemplois() {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [typeCours, setTypeCours] = useState("");
    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleAjouter = () => {
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("titre", titre);
        formData.append("description", description);
        formData.append("typeCours", typeCours); // Assurez-vous que le nom correspond à celui utilisé dans le backend

        axios.post('http://localhost:3001/emploist', formData) // Assurez-vous que l'URL est correcte
        .then(res => {
            if (res.data.message === "Données insérées avec succès") {
                console.log("Successed");
                // Rediriger l'utilisateur vers la page d'expert après l'ajout réussi
                window.location.href = '/uploadE';
            } else {
                console.log("Failed");
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            <Adminsidbar />
            <div className="main-container">
                <div className="row justify-content-center">
                    <div className="pd-ltr-20 xs-pd-20-10">
                        <div className="min-height-200px">
                            <div className="pd-20 card-box mb-30">
                                <div className="wizard-content">
                                    <form className="tab-wizard wizard-circle wizard" encType="multipart/form-data">
                                        <h5>Nouveau Emplois</h5>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Titre:</label>
                                                        <input type="text" className="form-control" value={titre} onChange={(e) => setTitre(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Description:</label>
                                                        <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Type de cours:</label>
                                                        <select className="form-control" value={typeCours} onChange={(e) => setTypeCours(e.target.value)}>
                                                            <option value="">Sélectionnez le type de cours</option>
                                                            <option value="Présentiel">Cours présenteil</option>
                                                            <option value="En ligne">Cours en ligne</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-7"></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="form-group text-purple">
                                                        <label htmlFor="file" className="custum-file-upload">
                                                            <div className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                                                                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                                                                    <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
                                                                    <g id="SVGRepo_iconCarrier"></g>
                                                                </svg>
                                                            </div>
                                                            <div className="text">
                                                                <span>Cliquez pour télécharger l'emploi</span>
                                                            </div>
                                                            <input type="file" id="file" name="photo" onChange={handleFile} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <button type="button" className="btn-purple" onClick={handleAjouter}>Ajouter</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default nvemplois;
