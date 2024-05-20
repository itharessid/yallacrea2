import React, { useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import './gprofile.css'
import { Link } from 'react-router-dom';


function gprofile() {
    const idCreateur = localStorage.getItem('userId'); // Récupère l'ID du créateur depuis le stockage local
  return (
    <div>
     <header id="site-header" className="fixed-top">
    <div className="container">
    <nav className="navbar navbar-expand-lg stroke">
            <h1>
                <a className="navbar-brand" href="index.html">
                    <img className="img-fluid" src="src/assets/images/yallalogo.png" alt="" style={{ maxWidth: '100px' }} />
                </a>
            </h1>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-lg-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Acceuil <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="apropos">Apropos</a>
                    </li>
                    <li className="nav-item dropdown">
                        <Dropdown>
                            <Dropdown.Toggle id="navbarDropdown">
                                Formation
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/Accelerer">Cours Accéléré</Dropdown.Item>
                                <Dropdown.Item href="/complet">Cours Complet</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/createur">Créateur</a>
                    </li>
                    <li className="nav-item">
                <Link to={`/profiluser/${idCreateur}`} className="nav-link">Mon Profil</Link> {/* Utilisez Link */}
                </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/afvideo">Vidéos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="contact">Contact</a>
                    </li>
                    <div className="search-right">
                    <Link to={`/`} className="btn button-style">Sortir</Link> {/* Utilisez Link */}
                    </div>
                </ul>
            </div>

        </nav>
    </div>
</header>   

    </div>




  )
}

export default gprofile
