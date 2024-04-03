import React, { useState, useEffect } from 'react';
import axios from 'axios';

function partencop() {   
     const [partenaires, setPartenaires] = useState([]);

     useEffect(() => {
        axios.get('http://localhost:3001/partenaireget')
            .then(res => {
                setPartenaires(res.data);
            })
            .catch(err => console.error(err));
    }, []);


  return (
     <section className="w3l-teams-32-main py-5">
            <div className="teams-32 py-md-4">
                <div className="container">
                    <div className="title-main text-center mx-auto mb-4">
                        <h3 className="title-big">NOS PARTENAIRES</h3>
                        <p className="sub-title mt-2">Nos partenaires académiques, technologiques et industriels sont toujours présents pour nos étudiants.</p>
                    </div>
                    <div className="row main-contteam-32 mt-sm-5 pt-lg-2">
                        {partenaires.map(partenaire => (
                            <div key={partenaire.id} className="col-lg-3 col-6 team-main-19 d-flex justify-content-center align-items-center">
                                <div className="column-19">
                                    <a href={partenaire.lien}><img className="img-fluid" src={`http://localhost:3001/photo/${partenaire.logo}`} alt={partenaire.nomSociete} /></a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default partencop
