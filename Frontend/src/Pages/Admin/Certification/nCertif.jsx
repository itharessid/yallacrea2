import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Adminsidbar from "../Sidbar/Adminsidbar";
import './nCertif.css';
import axios from 'axios';
import Certif from './certif';

function NCertif() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [NCertifData, setNCertifData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:3001/certif");
            setNCertifData(result.data);
        } catch (err) {
            console.log("Quelque chose qui cloche");
        }
    }

    const [NCertifField, setNCertifField] = useState({
        nom: "",
        prenom: "",
        formation: "",
        date: "",
        directeur: ""
    });

    const changeNCertifFieldHandler = (e) => {
        setNCertifField({
            ...NCertifField,
            [e.target.name]: e.target.value
        });
    }

    const [loading, setLoading] = useState(false);

    const onsubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/certif", NCertifField);
            setLoading(true);
        } catch (err) {
            console.log("Quelque chose qui cloche");
        }
    }

    if (loading) {
        return <Certif />;
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
                                    <form className="tab-wizard wizard-circle wizard">
                                        <h5>Nouvelle Certification</h5>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label htmlFor="nom">Nom:</label>
                                                        <input type="text" className="form-control" id="nom" name="nom" onChange={e => changeNCertifFieldHandler(e)} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label htmlFor="prenom">Prénom:</label>
                                                        <input type="text" className="form-control" id="prenom" name="prenom" onChange={e => changeNCertifFieldHandler(e)} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label htmlFor="formation">Titre de formation:</label>
                                                        <input type="text" className="form-control" id="formation" name="formation" onChange={e => changeNCertifFieldHandler(e)} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label htmlFor="directeur">Directeur:</label>
                                                        <input type="text" className="form-control" id="directeur" name="directeur" onChange={e => changeNCertifFieldHandler(e)} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-center"> 
                                                <div className="col-md-6"> 
                                                    <div className="form-group text-purple">
                                                        <label>Date de formation:</label>
                                                        <DatePicker
                                                            className="form-control date-picker"
                                                            selected={selectedDate}
                                                            onChange={(date) => {
                                                                setSelectedDate(date);
                                                                changeNCertifFieldHandler({
                                                                    target: { name: "date", value: date }
                                                                });
                                                            }}
                                                            dateFormat="dd/MM/yyyy" // Format de date jj/mm/année
                                                            placeholderText="Sélectionnez une date"
                                                            name="date"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 text-center">
                                                    <div className="form-group">
                                                        <button className="btn-purple" onClick={e => onsubmitChange(e)}>Ajouter</button>
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
export default NCertif;
