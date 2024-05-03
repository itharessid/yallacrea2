import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Adminsidbar from "../Sidbar/Adminsidbar";
import './nCertif.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom


function NCertif() {
    const [date, setSelectedDate] = useState(null);
    const [Data,setData]=useState([]);
    const [successMessage, setSuccessMessage] = useState(""); // Nouvel état pour stocker le message de succès


    useEffect(() => {
      fetchData();
    }, [])
    const fetchData=async()=>{
      try{
        const result =await axios("http://localhost:3001/certif");
        //console.log(result.data);
        setData(result.data)
      }catch(err){
        console.log("qu'elle que chose qui cloche");
      }
    }
    const[Field,setField]=useState({
        nom:"",
        prenom:"",
        type:"",
        formation:"",
        date:"",
        directeur:""
    });
    const changeFieldHandler=(e)=>{
        setField({
            ...Field,
            [e.target.name]:e.target.value
        });
        //console.log(NEtudiantField)
    }

    const onsubmitChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/certif", Field);
            console.log(response);
            setSuccessMessage("Une nouvelle certification a été ajoutée avec succès.");
        } catch (err) {
            console.log("quelque chose qui cloche");
        }
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
                                                        <input type="text" className="form-control" id="nom" name="nom" onChange={e=>changeFieldHandler(e)} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label htmlFor="prenom">Prénom:</label>
                                                        <input type="text" className="form-control" id="prenom" name="prenom" onChange={e=>changeFieldHandler(e)} required  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label htmlFor="formation">Titre:</label>
                                                        <input type="text" className="form-control" id="formation" name="formation"  onChange={e=>changeFieldHandler(e)} required  />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Type:</label>
                                                        <select className="custom-select form-control" name="type"onChange={e=>changeFieldHandler(e)}required>
                                                            <option value="vide">--</option>
                                                            <option value="Attestation">Attestation</option>
                                                            <option value="Certificat de Réussite">Certificat de Réussite</option>
                                                            <option value="Diplôme">Diplôme</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6"> 
                                                    <div className="form-group text-purple">
                                                        <label>Date de formation:</label>
                                                        <DatePicker
                                                            className="form-control date-picker"
                                                            selected={date}
                                                            onChange={(date) => {
                                                                setSelectedDate(date);
                                                                changeFieldHandler({
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
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label htmlFor="directeur">Directeur:</label>
                                                        <input type="text" className="form-control" id="directeur" name="directeur" onChange={e=>changeFieldHandler(e)}required />
                                                    </div>
                                                </div>
                                                </div>
                                                
                                            <div className="row">
                                                <div className="col-md-6 text-center">
                                                    <div className="form-group">
                                                        <button className="btn-purple" onClick={e=>onsubmitChange(e)}>Ajouter</button>                 
                                                    </div>
                                                </div>
                                            </div>
                                            {successMessage && (
                                              <div className="row">
                                                <div className="col-md-12 text-center">
                                                  <div className="alert alert-success">{successMessage}</div>
                                                    {/* Rediriger vers la page "/certif" */}
                                                    <Link to="/certif" className="btn btn-primary">Retourner à la page de certification</Link>
                                                </div>
                                              </div>
                                            )}
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
