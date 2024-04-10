import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './video.css';

function Video() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleAddVideo = () => {
    // Implémentez ici la logique pour ajouter une vidéo
    console.log("Ajouter une vidéo");
  };

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
                  <a className="nav-link" href="/">Accueil <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="apropos">A propos</a>
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
                  <a className="nav-link" href="createur">Créateur</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profiluser">Mon Profil</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/video">Vidéos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact">Contact</a>
                </li>
                <div className="search-right">
                  <a href="preInscri" className="btn button-style">S'inscrire</a>
                </div>
              </ul>
            </div>

            <div className="cont-ser-position">
              <nav className="navigation">
                <div className="theme-switch-wrapper">
                  <label className="theme-switch" htmlFor="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div className="mode-container">
                      <i className="gg-sun"></i>
                      <i className="gg-moon"></i>
                    </div>
                  </label>
                </div>
              </nav>
            </div>
          </nav>
        </div>
      </header>

      <section className="w3l-breadcrumb">
        
            
        <div className="container">
        
        <div className="container-fluid">
        <section className="card-section d-flex justify-content-center align-items-center">
          <div className="container">
            {/* Barre de recherche */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Rechercher des vidéos..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input" // Ajout de la classe CSS personnalisée

              />
              <button className="search-button" onClick={handleSearch}>Rechercher</button>
              <button className="search-button" onClick={handleAddVideo}>
             <a href="/video">Ajouter une nouvelle vidéo</a>
</button>
            </div>


            <div className="row">
              <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <div className="cardv">
                  <video controls className="cardv-video">
                    <source src="url_de_la_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="description">
                    <div className="heading">Description de la vidéo</div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p>Date de publication: 21 mars 2024</p> {/* Exemple de date */}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <div className="cardv">
                  <video controls className="cardv-video">
                    <source src="url_de_la_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="description">
                    <div className="heading">Description de la vidéo</div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p>Date de publication: 21 mars 2024</p> {/* Exemple de date */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
       

        
          
        </div>
      </section>
    </div>
  );
}

export default Video;
