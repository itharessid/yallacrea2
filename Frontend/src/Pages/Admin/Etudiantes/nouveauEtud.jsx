import React, { useState, useEffect } from 'react';;
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Adminsidbar from "../Sidbar/Adminsidbar";
import './nouveauEtud.css';
import axios from 'axios';
import Etudiants from './etudiant';

function NouveauEtud() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [NEtudiantData,setNEtudiantData]=useState([]);
    useEffect(() => {
      fetchData();
    }, [])
    const fetchData=async()=>{
      try{
        const result =await axios("http://localhost:3001/etudiant");
        //console.log(result.data);
        setNEtudiantData(result.data)
      }catch(err){
        console.log("qu'elle que chose qui cloche");
      }
    }
    const[NEtudiantField,setNEtudiantField]=useState({
        nom:"",
        prenom:"",
        email:"",
        adresse:"",
        num:"",
        anniversaire:"",
        niveau:"",
        programme:"",
        codePromo:"" 
    });
    const changeNEtudiantFieldHandler=(e)=>{
        setNEtudiantField({
            ...NEtudiantField,
            [e.target.name]:e.target.value
        });
        //console.log(NEtudiantField)
    }
    const [loading,setLoading]=useState(false)

    const onsubmitChange=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:3001/etudiant",NEtudiantField);
            console.log(response);
            setLoading(true);
        }catch(err){
            console.log("quelque chose qui cloche");
        }
    }
    if(loading){
        return<Etudiants/>
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
                                        <h5>Nouveau Etudiant</h5>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Nom:</label>
                                                        <input type="text" className="form-control" name="nom" onChange={e=>changeNEtudiantFieldHandler(e)} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Prénom:</label>
                                                        <input type="text" className="form-control" name="prenom" onChange={e=>changeNEtudiantFieldHandler(e)} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Email:</label>
                                                        <input type="email" className="form-control" name="email" onChange={e=>changeNEtudiantFieldHandler(e)} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Adresse</label>
                                                        <input type="text" className="form-control" name="adresse"onChange={e=>changeNEtudiantFieldHandler(e)} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Numéro:</label>
                                                        <input type="number" className="form-control" name="num" onChange={e=>changeNEtudiantFieldHandler(e)} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 pl-md-5">
                                                <div className="form-group text-purple">
                                                <label>Anniversaire:</label>
                                                <DatePicker
                                                    className="form-control date-picker"
                                                    selected={selectedDate}
                                                    onChange={(date) => {
                                                        setSelectedDate(date);
                                                        changeNEtudiantFieldHandler({
                                                            target: { name: "anniversaire", value: date }
                                                        });
                                                    }}
                                                    placeholderText="Select Date"
                                                    name="anniversaire"
                                                    required
                                                />
                                            </div>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Niveau:</label>
                                                        <select className="custom-select form-control" name="niveau" onChange={e=>changeNEtudiantFieldHandler(e)} required>
                                                            <option value="vide">--</option>
                                                            <option value="bac">Avec Bac</option>
                                                            <option value="sansBac">Sans Bac</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Programme:</label>
                                                        <select className="custom-select form-control" name="programme" onChange={e=>changeNEtudiantFieldHandler(e)} required>
                                                            <option value="vide">--</option>
                                                            <option value="complet">Complet</option>
                                                            <option value="accelere">Accéléré</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Code Promo:</label>
                                                        <input type="text" className="form-control" name="codePromo"onChange={e=>changeNEtudiantFieldHandler(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6t">
                                                    <div className="form-group">
                                                        <button className="btn-purple" onClick={e=>onsubmitChange(e)}>Ajouter</button>
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
