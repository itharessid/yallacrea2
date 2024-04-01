import React, { useState, useEffect } from 'react';;
import 'react-datepicker/dist/react-datepicker.css';
import Adminsidbar from "../Sidbar/Adminsidbar";
import './NDomaine.css';
import axios from 'axios';
import Domaines from './domaines';

function NDomaine() {
    const [NDomaineData,setNDomaineData]=useState([]);
    useEffect(() => {
      fetchData();
    }, [])
    const fetchData=async()=>{
      try{
        const result =await axios("http://localhost:3001/domaine");
        //console.log(result.data);
        setNDomaineData(result.data)
      }catch(err){
        console.log("qu'elle que chose qui cloche");
      }
    }
    const[NDomaineField,setNDomaineField]=useState({
        nomDomaine:""
    });
    const changeNDomaineFieldHandler=(e)=>{
        setNDomaineField({
            ...NDomaineField,
            [e.target.name]:e.target.value
        });
        //console.log(NDomaineField)
    }
    const [loading,setLoading]=useState(false)

    const onsubmitChange=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:3001/domaine",NDomaineField);
            console.log(response);
            setLoading(true);
        }catch(err){
            console.log("quelque chose qui cloche");
        }
    }
    if(loading){
        return<Domaines/>
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
                                        <h5>Nouveau Domaine</h5>
                                        <section>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Nom Domaine:</label>
                                                        <input type="text" className="form-control" name="nomDomaine" onChange={e=>changeNDomaineFieldHandler(e)} required />
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

export default NDomaine;
