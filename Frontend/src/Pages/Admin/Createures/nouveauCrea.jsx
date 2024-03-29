import Adminsidbar from "../Sidbar/Adminsidbar";
import './nouveauCrea.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
function NouveauCrea() {
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
                                      <h5>Nouveau Créateur</h5>
                                      <section>
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Nom:</label>
                                                      <input type="text" className="form-control" required />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Prénom:</label>
                                                      <input type="text" className="form-control" required />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Email:</label>
                                                      <input type="email" className="form-control" required />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Adresse</label>
                                                      <input type="text" className="form-control" required />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row">
                                              <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Numéro:</label>
                                                      <input type="number" className="form-control" required />
                                                  </div>
                                              </div>
                                              <div className="col-md-6 pl-md-5">
                                              <div className="form-group text-purple">
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
                                                  <div className="form-group text-purple">
                                                      <label>Lien Instagram:</label>
                                                      <input type="link" className="form-control" required />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Lien Facebook:</label>
                                                      <input type="link" className="form-control" required />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row justify-content-center">
                                          <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Lien TikTok:</label>
                                                      <input type="link" className="form-control" required />
                                                  </div>
                                              </div>
                                                <div className="col-md-6">
                                                  <div className="form-group text-purple">
                                                      <label>Domaine:</label>
                                                      <select className="custom-select form-control" required>
                                                          <option value="santé">Santé</option>
                                                          <option value="loi">Loi</option>
                                                          <option value="mode">Mode</option>
                                                      </select>
                                                  </div>
                                              </div>
                                              </div>
                                              <div className="row">
                                              <div className="col-md-6 ">
                                                  <div className="form-group text-purple">
                                                      <label>Numéro des followers:</label>
                                                      <input type="text" className="form-control" required />
                                                  </div>
                                              </div>
                                              <div className="col-md-6 ">
                                                    <div className="form-group text-purple">
                                                        <label htmlFor="file" className="custum-file-upload">
                                                            <div className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path></g></svg>
                                                            </div>
                                                            <div className="text">
                                                                <span>Cliquez pour télécharger l'image</span>
                                                            </div>
                                                            <input type="file" id="file" />
                                                        </label>
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
export default NouveauCrea;