import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Adminsidbar from "../Sidbar/Adminsidbar";
import './nouveauEtud.css';

function NouveauEtud() {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <>
            <Adminsidbar />
            <div className="main-container">
                <div className="row justify-content-center">
                    <div className="pd-ltr-20 xs-pd-20-10">
                        <div className="min-height-200px">
                            <div className="pd-20 card-box mb-30">
                                <div className="wizard-content">
                                    <form className="tab-wizard wizard-circle wizard">
                                        <h5>Nouveau Etudiant</h5>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Nom:</label>
                                                        <input type="text" className="form-control" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Prénom:</label>
                                                        <input type="text" className="form-control" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Email:</label>
                                                        <input type="email" className="form-control" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Adresse</label>
                                                        <input type="text" className="form-control" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Numéro:</label>
                                                        <input type="number" className="form-control" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 pl-md-5">
                                                <div className="form-group">
                                                    <label>Anniversaire:</label>
                                                        <DatePicker
                                                            className="form-control date-picker"
                                                            selected={selectedDate}
                                                            onChange={date => setSelectedDate(date)}
                                                            placeholderText="Select Date"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Niveau:</label>
                                                        <select className="custom-select form-control" required>
                                                            <option value="bac">Avec Bac</option>
                                                            <option value="sansBac">Sans Bac</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Programme:</label>
                                                        <select className="custom-select form-control" required>
                                                            <option value="complet">Complet</option>
                                                            <option value="accelere">Accéléré</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Code Promo:</label>
                                                        <input type="number" className="form-control" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6t">
                                                    <div className="form-group">
                                                        <button className="btn-purple">Ajouter</button>
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

export default NouveauEtud;
