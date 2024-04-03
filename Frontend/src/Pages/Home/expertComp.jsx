import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpertComp() {
    const [experts, setExperts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/experget')
            .then(res => {
                setExperts(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="w3l-teams-32-main py-5">
            <div className="teams-32 py-md-4">
                <div className="container">
                    <div className="title-main text-center mx-auto mb-4">
                        <h3 className="title-big">Nos Experts</h3>
                    </div>
                    <br />
                    <div className="row main-contteam-32 justify-content-center">
                        {experts.map(expert => (
                            <div key={expert.id} className="col-lg-3 col-6  center team-main-19">
                                <div className="column-19">
                                    <img className="img-fluid" src={`http://localhost:3001/photo/${expert.photo}`}alt={expert.nom} />
                                </div>
                                <div className="right-team-9">
                                    <h6 className="title-team-32">{expert.nom} {expert.prenom} </h6>
                                    <p className="sm-text-32">{expert.poste}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExpertComp;
