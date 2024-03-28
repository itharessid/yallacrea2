import axios from "axios";
import Adminsidbar from "../Sidbar/Adminsidbar";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

function NvExpert() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [telef, setTelef] = useState("");
    const [poste, setPoste] = useState(""); // Nouveau champ poste
    const [file, setFile] = useState(null);
    const [data, setData] = useState({});

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        axios.get('http://localhost:3001/experget')
            .then(res => {
                setData(res.data[0]);
            })
            .catch(err => console.log(err));
    }, []);

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("nom", nom);
        formData.append("prenom", prenom);
        formData.append("Email", email);
        formData.append("telef", telef);
        formData.append("poste", poste); // Ajout du champ poste

        axios.post('http://localhost:3001/expert', formData)
        .then(res => {
            if (res.data.message === "Données insérées avec succès") {
                console.log("Successed");
                history.push('/expert');

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
                                        <h5>Nouveau Expert</h5>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Nom:</label>
                                                        <input type="text" className="form-control" required value={nom} onChange={(e) => setNom(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Prénom:</label>
                                                        <input type="text" className="form-control" required value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Email:</label>
                                                        <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Numéro:</label>
                                                        <input type="number" className="form-control" required value={telef} onChange={(e) => setTelef(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Poste:</label>
                                                        <input type="text" className="form-control" required value={poste} onChange={(e) => setPoste(e.target.value)} /> {/* Champ pour le poste */}
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
                                                                <span>Cliquez pour télécharger l'image</span>
                                                            </div>
                                                            <input type="file" id="file" name="photo" onChange={handleFile} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <Link to="/expert" className="btn-purple" onClick={handleUpload}>Ajouter</Link>
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

export default NvExpert;
