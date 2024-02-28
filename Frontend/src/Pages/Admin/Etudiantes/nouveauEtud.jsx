import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importer les styles par défaut de react-datepicker
import Adminsidbar from "../Sidbar/Adminsidbar";
import './nouveauEtud.css';

function NouveauEtud() {
    const [selectedDate, setSelectedDate] = useState(null); // État pour stocker la date sélectionnée

    return (
        <>
            <Adminsidbar />
            <div className="main-container">
                <div className="row">
                    <div className="pd-ltr-20 xs-pd-20-10">
                        <div className="min-height-200px">
                            <div className="pd-20 card-box mb-30">
                                <div className="wizard-content">
                                    <form className="tab-wizard wizard-circle wizard">
                                        <h5 >Nouveau Etudiant</h5>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Nom:</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Prénom:</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Email:</label>
                                                        <input type="email" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Adresse</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col-md-6">
                                              <div className="form-group">
                                                  <label>Numéro:</label>
                                                  <input type="number" className="form-control" />
                                              </div>
                                            </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Date de naissance:</label>
                                                        <DatePicker
                                                            className="form-control date-picker"
                                                            selected={selectedDate}
                                                            onChange={date => setSelectedDate(date)}
                                                            placeholderText="Select Date"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col-md-6">
                                            <div class="form-group">
                                                <label>Niveau:</label>
                                                <select class="custom-select form-control">
                                                  <option value="bac">Avec Bac</option>
                                                  <option value="sansBac">Sans Bac</option>
                                                </select>
                                              </div>
                                            </div>
                                                <div className="col-md-6">
                                                <div class="form-group">
                                                <label>Programme:</label>
                                                <select class="custom-select form-control">
                                                  <option value="complet">Complet</option>
                                                  <option value="accelere">Accéléré</option>
                                                </select>
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
