import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import './createur.css';
import { Link } from 'react-router-dom';


function Crea() {
    const [createurs, setCreateurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [domaines, setDomaines] = useState([]);
    const [selectedDomaine, setSelectedDomaine] = useState('');

    useEffect(() => {
        fetchData();
        fetchDomaines();
    }, [searchKeyword, selectedDomaine]);

    const fetchData = async () => {
        try {
            let url = "http://localhost:3001/createur";
            const params = {};
            if (searchKeyword) {
                params.keyword = searchKeyword;
            }
            if (selectedDomaine) {
                params.domaine = selectedDomaine;
            }
            const result = await axios.get(url, { params });
            setCreateurs(result.data);
            setLoading(false);
        } catch (err) {
            console.log("Quelque chose s'est mal passé lors de la récupération des données des créateurs :", err);
            setError("Une erreur s'est produite lors de la récupération des données des créateurs");
            setLoading(false);
        }
    };

    const fetchDomaines = async () => {
        try {
            const result = await axios.get("http://localhost:3001/domaine");
            setDomaines(result.data);
        } catch (err) {
            console.log("Quelque chose s'est mal passé lors de la récupération des domaines :", err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const handleDomaineChange = (e) => {
        setSelectedDomaine(e.target.value);
    };

    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>Une erreur s'est produite : {error}</div>;
    }

    const filteredCreateurs = createurs.filter(createur => {
        // Filtrer par nom et prénom contenant la lettre saisie
        const fullName = `${createur.nom} ${createur.prenom}`.toLowerCase();
        return fullName.includes(searchKeyword.toLowerCase());
    });

    const handleButtonClick = (createurId) => {
        // Rediriger l'utilisateur vers la page de connexion avec l'ID du créateur
        window.location.href = `/connexion/${createurId}`;
    };
    // Filtrer les créateurs par domaine sélectionné
    const filteredByDomaine = selectedDomaine ? filteredCreateurs.filter(createur => createur.domaine === selectedDomaine) : filteredCreateurs;

    return (
        <section className="trending-podcast-section section-padding">
            <div className="container">
                <div className="search-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Rechercher par nom de créateur"
                            className="search-input"
                        />
                        <select
                            value={selectedDomaine}
                            onChange={handleDomaineChange}
                            className="search-select"
                        >
                            <option value="">Tous les domaines</option>
                            {domaines.map(domaine => (
                                <option key={domaine.idDomaine} value={domaine.nomDomaine}>{domaine.nomDomaine}</option>
                            ))}
                        </select>
                        <button type="submit" className="search-button">Rechercher</button>
                    </form>
                </div>
                <br />
                <br />

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {filteredByDomaine.map(createur => (
                        <div className="col mb-4" key={createur.idCreateur}>
                            <div className="custom-block custom-block-full" style={{width:'200px'}}>
                                <div className="custom-block-image-wrap">
                                        <img src={`/photo/${createur.image}`} className="custom-block-image img-fluid" alt="" />
                                </div>
                                <div className="custom-block-info">
                                    <h5 className="mb-2" style={{color:'black',fontWeight:'500',textDecoration:'inherit'}}>
                                        {createur.nom} {createur.prenom}
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
                                    <button className='btnv' onClick={() => handleButtonClick(createur.idCreateur)}>Voir plus</button>
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
