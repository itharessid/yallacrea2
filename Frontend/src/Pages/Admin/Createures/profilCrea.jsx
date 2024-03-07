import React, { useState } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ProfileCrea() {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <>
            <Adminsidbar />
            <div className="main-container">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-30">
                        <div className="pd-20 profile-container height-100-p">
                            <div className="profile-info">
                                <h5 className="mb-20 h5 text-purple">Informations</h5>
                                <ul>
                                    <li>
                                        <span>Nom:</span>
                                        ELFEKIH
                                    </li>
                                    <li>
                                        <span>Prénom:</span>
                                        Ons
                                    </li>
                                    <li>
                                        <span>Email:</span>
                                        elfekihons@gmail.com
                                    </li>
                                    <li>
                                        <span>Adresse:</span>
                                        Beni khiar
                                    </li>
                                    <li>
                                        <span>Numéro:</span>
                                        55963211
                                    </li>
                                    <li>
                                        <span>Date d'anniversaire:</span>
                                        **/**/****
                                    </li>
                                    <li>
                                        <span>Domaine:</span>
                                        A
                                    </li>
                                    <li>
                                        <span>Suivis:</span>
                                        1K
                                    </li>
                                    <li>
                                        <a href="#" className="btn" style={{ backgroundColor: '#3b5998', color: '#ffffff' }}>
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                        <a href="#" className="btn" style={{ backgroundColor: '#70218F', color: '#ffffff' }}>
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                        <a href="#" className="btn" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                                            <img src="/src/assets/images/tiktok-16.png" alt="TikTok Icon" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 mb-30">
                        <div className="pd-20 profile-container height-100-p">
                            <div className="profile-setting">
                                <form className="tab-wizard wizard-circle wizard">
                                    <h4 className="mb-20 h5 text-purple text-center">Editer les informations</h4>
                                    <section>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Edit Nom</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Edit Prénom</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Edit Email</label>
                                                    <input type="email" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Edit Adresse</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Edit Numéro</label>
                                                    <input type="tel" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 pl-md-5">
                                                <div className="form-group text-purple">
                                                    <label>Naissance:</label>
                                                    <DatePicker
                                                        className="form-control date-picker"
                                                        selected={selectedDate}
                                                        onChange={date => setSelectedDate(date)}
                                                        placeholderText="Select Date"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Edit Suivis</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Editer lien Facebook</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Editer lien Instagram</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group text-purple">
                                                    <label>Editer lien TikTok</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 offset-md-3">
                                                <div className="form-group text-purple text-center">
                                                    <label>Editer Domaine:</label>
                                                    <select className="custom-select form-control" required>
                                                        <option value="santé">Santé</option>
                                                        <option value="loi">Loi</option>
                                                        <option value="mode">Mode</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <div className="row">
                                        <div className="col-md-6 offset-md-3">
                                            <div className="form-group text-center">
                                                <button className="btn-purple">Enregistrer</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileCrea;
