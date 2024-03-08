import React from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import DatePicker from 'react-datepicker'; // Assurez-vous d'importer le composant DatePicker si vous l'utilisez
import 'react-datepicker/dist/react-datepicker.css'; // Assurez-vous d'importer les styles du DatePicker si vous l'utilisez
import './profilEtud.css';

function ProfileEtud() {
    const [selectedDate, setSelectedDate] = React.useState(null); // Assurez-vous d'utiliser le hook useState si vous utilisez selectedDate

    return (
        <div>
            <Adminsidbar />
            <div className="main-container">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-30" style={{maxWidth: '100%',marginLeft: '-10px'}}>
                        <div className="pd-20 profile-container height-100-p">
                            <div className="profile-info">
                                <h5 className="mb-20 h5 text-purple">Informations</h5>
                                <ul>
                                    <li>
                                        <span>Nom:</span>
                                        ELFEKIH
                                    </li>
                                    <li>
                                        <span>Prénom</span>
                                        Ons
                                    </li>
                                    <li>
                                        <span>Email</span>
                                        elfekihons@gmail.com
                                    </li>
                                    <li>
                                        <span>Adresse</span>
                                        Beni khiar
                                    </li>
                                    <li>
                                        <span>Numéro:</span>
                                        55963211
                                    </li>
									<li>
                                        <span>Date de Naissance:</span>
                                        **/**/**** 
                                    </li>
                                    <li>
                                        <span>Programme:</span>
                                        Complet
                                    </li>
									<li>
                                        <span>Niveau:</span>
                                        Avec Bac
                                    </li>
                                    <li>
                                        <span>Code Promo:</span>
                                        7800
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
                                                        <label>Editer Programme:</label>
                                                        <select className="custom-select form-control" required>
                                                            <option value="complet">Complet</option>
                                                            <option value="accelere">Accéléré</option>
                                                        </select>
                                                    </div>
                                                </div>
											<div className="col-md-6">
                                                    <div className="form-group text-purple">
                                                        <label>Editer Niveau:</label>
                                                        <select className="custom-select form-control" required>
                                                            <option value="bac">Avec Bac</option>
                                                            <option value="sansBac">Sans Bac</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            <div className="col-md-6 offset-md-3">
                                                <div className="form-group text-purple text-center">
                                                    <label>Code Promo</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            </div>
										<div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        <div className="form-group text-center">
                                            <button className="btn-purple">Enregistrer</button>
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
    );
}

export default ProfileEtud;
