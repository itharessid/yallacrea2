import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import './createur.css';
function Crea() {
    const [createurs, setCreateurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const result = await axios.get("http://localhost:3001/createur");
          setCreateurs(result.data);
          setLoading(false);
        } catch (err) {
          console.log("Quelque chose s'est mal passé lors de la récupération des données créateurs :", err);
          setError("Une erreur s'est produite lors de la récupération des données des créateurs");
          setLoading(false);
        }
      };
    
      if (loading) {
        return <div>Chargement en cours...</div>;
      }
    
      if (error) {
        return <div>Une erreur s'est produite : {error}</div>;
      }

    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>Une erreur s'est produite : {error}</div>;
    }

    return (
        <section className="trending-podcast-section section-padding">
            <div className="container">
                <div className="row">
                    {createurs && createurs.map(createur => (
                        <div className="col-lg-4 col-12 mb-4 mb-lg-0" key={createur.idCreateur}>
                            <div className="custom-block custom-block-full">
                                <div className="custom-block-image-wrap">
                                    <a href="/connexion">
                                        <img src={`/photo/${createur.image}`} className="custom-block-image img-fluid" alt=""/>
                                    </a>
                                </div>

                                <div className="custom-block-info">
                                    <h5 className="mb-2">
                                        <a href="/connexion">
                                            {createur.nom} {createur.prenom}
                                        </a>
                                    </h5>

                                    <div className="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href={createur.lienFace} className="fa fa-facebook">
                                            <span></span>
                                        </a>

                                        <a href={createur.lienInsta} className="fa fa-instagram">
                                            <span></span>
                                        </a>

                                        <a href={createur.lienTik} className="tiktok-icon me-1">
                                        <FontAwesomeIcon icon={faTiktok} className="tiktok-icon-black" />
                                       </a>
                                      </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Crea;
``
