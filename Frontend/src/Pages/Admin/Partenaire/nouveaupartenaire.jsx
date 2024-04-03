import React, { useState } from 'react';
import Adminsidbar from "../Sidbar/Adminsidbar";
import axios from 'axios';

function nouveaupartenaire() {
    const [nomSociete, setNomSociete] = useState('');
    const [numero, setNumero] = useState('');
    const [email, setEmail] = useState('');
    const [lien, setLien] = useState('');

    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nomSociete', nomSociete);
        formData.append('numero', numero);
        formData.append('email', email);
        formData.append('lien', lien);

        formData.append('photo', photo);

        axios.post('http://localhost:3001/partenaire', formData)
        .then(res => {
            if (res.data.message === "Données insérées avec succès") {
                console.log("Successed");
                //history.push('/expert');

            } else {
                console.log("Failed");
            }
        })
        .catch(err => console.log(err));

        
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <>
            <Adminsidbar />
            <div className="main-container">
                <div className="row justify-content-center">
                    <div className="pd-ltr-20 xs-pd-20-10">
                        <div className="min-height-200px">
                            <div className="pd-20 card-box mb-30">
                                <div className="wizard-content">
                                    <form className="tab-wizard wizard-circle wizard" onSubmit={handleSubmit}>
                                        <h5>Nouveau Partenaire</h5>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Nom de société :</label>
                                                        <input type="text" className="form-control" value={nomSociete} onChange={(e) => setNomSociete(e.target.value)} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Numéro :</label>
                                                        <input type="text" className="form-control" value={numero} onChange={(e) => setNumero(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Email :</label>
                                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
    <div className="form-group text-purple">
        <label>lien :</label>
        <input type="text" className="form-control" value={lien} onChange={(e) => setLien(e.target.value)} required />
    </div>
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
                                                            <input type="file" id="file" onChange={handleFileChange} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <button type="submit" className="btn-purple">Ajouter</button>
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
    )
}

export default nouveaupartenaire;
