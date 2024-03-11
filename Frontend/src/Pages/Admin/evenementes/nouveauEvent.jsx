import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Adminsidbar from "../Sidbar/Adminsidbar";

function NouveauEvent(){
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
                                        <h5>Nouveau Evènement</h5>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Titre:</label>
                                                        <input type="text" className="form-control" required />
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Description:</label>
                                                        <textarea className="form-control" required></textarea>
                                                    </div>
                                                </div>
                                                </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Date de l'évènement:</label>
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

export default NouveauEvent
