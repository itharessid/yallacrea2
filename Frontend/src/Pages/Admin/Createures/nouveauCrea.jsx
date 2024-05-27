import Adminsidbar from "../Sidbar/Adminsidbar";
import './nouveauCrea.css';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function NouveauCrea() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [num, setnum] = useState("");
  const [lienInsta, setLienInsta] = useState(""); // Nouveau champ poste
  const [lienFace, setLienFace] = useState("");
  const [lienTik, setLienTik] = useState("");
  const [domaine, setDomaine] = useState("");
  const [nbFollowers, setNbFollowers] = useState("");
  const [description, setDescription] = useState("");
  const [anniversaire, setAnniversaire] = useState(null); // Utilisez null comme valeur initiale
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [domainesList, setDomainesList] = useState([]);


  const handleFile = (e) => {
    setFile(e.target.files[0]);
}

useEffect(() => {
    axios.get('http://localhost:3001/createur')
        .then(res => {
            setData(res.data[0]);
        })
        .catch(err => console.log(err));
}, []);
useEffect(() => {
    axios.get('http://localhost:3001/domaine')
        .then(res => {
            setDomainesList(res.data);
        })
        .catch(err => console.log(err));
}, []);

const handleUpload = () => {
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("nom", nom); // Utiliser la valeur de nom définie dans la fonction NouveauCrea
    formData.append("prenom", prenom);
    formData.append("adresse", adresse);
    formData.append("email", email);
    formData.append("num", num);
    // Convertir la date en format ISO avec le décalage horaire correct
    const anniversaireValue = anniversaire ? new Date(anniversaire.getTime() - anniversaire.getTimezoneOffset() * 60000).toISOString().split('T')[0] : null;
    formData.append("anniversaire", anniversaireValue);// Assurez-vous de convertir la date au format ISO si elle est sélectionnée
    formData.append("lienInsta", lienInsta);
    formData.append("lienFace", lienFace);
    formData.append("lienTik", lienTik);
    formData.append("domaine", domaine); 
    formData.append("nbFollowers", nbFollowers);
    formData.append("description", description);



    

    axios.post('http://localhost:3001/createur', formData)
    .then(res => {
        if (res.data.message === "Données insérées avec succès") {
            console.log("Successed");

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
                                      <h5>Nouveau Créateur</h5>
                                      <section>
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Nom:</label>
                                                      <input type="text" className="form-control" required value={nom} onChange={(e) => setNom(e.target.value)}/>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Prénom:</label>
                                                      <input type="text" className="form-control" required value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
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
                                                      <label>Adresse</label>
                                                      <input type="text" className="form-control" required value={adresse} onChange={(e) => setAdresse(e.target.value)}/>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Numéro:</label>
                                                        <input type="number" className="form-control" name="num" required value={num} onChange={(e) => setnum(e.target.value)}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 pl-md-5">
                                                <div className="form-group text-purple">
                                                <label>Anniversaire:</label>
                                                <hr/>
                                                <DatePicker 
                                                className="form-control date-picker anniversaire"
                                                selected={anniversaire}
                                                onChange={(date) => setAnniversaire(date)}
                                                dateFormat="dd/MM/yyyy" // Format de date jj/mm/année
                                                placeholderText="Sélectionner une date"
                                                name="anniversaire"
                                                required
                                                
                                                />
                                            </div>
                                                </div>
                                            </div>
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Lien Instagram:</label>
                                                      <input type="link" className="form-control" required value={lienInsta} onChange={(e) => setLienInsta(e.target.value)} />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Lien Facebook:</label>
                                                      <input type="link" className="form-control" required value={lienFace} onChange={(e) => setLienFace(e.target.value)}/>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row justify-content-center">
                                          <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Lien TikTok:</label>
                                                      <input type="link" className="form-control" required value={lienTik} onChange={(e) => setLienTik(e.target.value)}/>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Domaine:</label>
                                                    <select className="custom-select form-control" required value={domaine} onChange={(e) => setDomaine(e.target.value)}>
                                                        <option value="">--</option>
                                                        {domainesList.map(domaine => (
                                                            <option key={domaine.id} value={domaine.id}>{domaine.nomDomaine}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                              </div>
                                              <div className="row">
                                              <div className="col-md-6 ">
                                                  <div className="form-group text-purple">
                                                      <label>Numéro des followers:</label>
                                                      <input type="text" className="form-control" required value={nbFollowers} onChange={(e) => setNbFollowers(e.target.value)}/>
                                                  </div>
                                              </div>
                                              <div className="col-md-6 ">
                                                  <div className="form-group text-purple">
                                                      <label>Description:</label>
                                                      <textarea className="form-control" required value={description} onChange={(e) => setDescription(e.target.value)}/>
                                                  </div>
                                              </div>
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
                                              <div className="col-md-6t">
                                              <div className="form-group">
                                              <Link to="/createures" onClick={handleUpload} className="btn btn-primary" style={{ backgroundColor: 'purple',color:'white' }}> Ajouter</Link> 
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
export default NouveauCrea;