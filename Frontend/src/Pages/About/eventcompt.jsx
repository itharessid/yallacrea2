import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';

function EventCompt() {   
     const [event, setEvent] = useState([]);

     useEffect(() => {
        axios.get('http://localhost:3001/evenements')
            .then(res => {
                setEvent(res.data);
            })
            .catch(err => console.error(err));
    }, []);


  return (
     <section className="w3l-teams-32-main py-5">
            <div className="teams-32 py-md-4">
                <div className="container">
                    <div className="title-main text-center mx-auto mb-4">
                        <h3 className="title-big">NOS Activités</h3>
                        <p className="sub-title mt-2">Découvrez une multitude d'événements passionnants organisés par notre école, offrant une variété d'opportunités d'apprentissage, de divertissement et d'engagement communautaire pour tous les étudiants.</p>
                    </div>
                    <div className="row main-contteam-32 justify-content-center">
    {event.map(event => (
        <div key={event.id} className="col-lg-3 col-6 center team-main-19" style={{ marginRight:'50px' }}> {/* Add margin bottom */}
            <div className="right-team-9">
                <h7 className="title-team-32" style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{event.titre}</h7>
                <p className="sm-text-32">{event.dateevent ? new Date(event.dateevent).toLocaleDateString('fr-FR') : '-'}</p>
            </div>
            <div className="column-19">
                <a href={event.lienvideo}>
                    <img
                        className="img-fluid"
                        src={`http://localhost:3001/photo/${event.image}`}
                        alt={event.title}
                        style={{ width: '200px', height: '150px' }} // Dimensions statiques de la carte
                    />
                </a>
                <p className="sm-text-32" style={{ width: '150px', height: '100px' }}>{event.description}</p>
            </div>
            <div>
                <button className="button2">
                    <a href={event.lienphotos}>
                        <FontAwesomeIcon icon={faPhotoFilm} />
                    </a>
                </button>
            </div>
        </div>
    ))}
</div>

                </div>
            </div>
        </section>
    );
}

export default EventCompt;
