import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

function EmploiDuTemps({ emploi }) {
  const [showImage, setShowImage] = useState(false);
  
  const handleToggleImage = () => {
    setShowImage(!showImage);
  };

  const handleDownload = async () => {
    try {
      // Fetch the image data
      const response = await axios.get(`http://localhost:3001/temp/${emploi.emplois}`, {
        responseType: 'blob' // Set response type to blob
      });
  
      // Create a blob from the image data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
      // Create a URL for the blob
      const imageUrl = window.URL.createObjectURL(blob);
  
      // Create a link element
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'emploi.jpg'; // Set the file name
  
      // Append the link to the body
      document.body.appendChild(link);
  
      // Click the link to trigger the download
      link.click();
  
      // Remove the link from the body
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  
  
  

   return (
    <div className="col-lg-6 col-sm-6 mt-sm-0 mt-4">
      <div className="grids5-info">
        <a href={emploi.emplois} target="_blank" rel="noopener noreferrer">
         <img  href={`http://localhost:3001/temp/${emploi.emplois}`} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </a>
        <div className="blog-info">
          <h5>{emploi.titre}</h5>
          <br/>
          <h4><a href={`http://localhost:3001/temp/${emploi.emplois}`} src={`http://localhost:3001/temp/${emploi.emplois}`}>Voir l'emplois de temps </a></h4> {/* Utiliser l'URL de l'image pour rediriger vers l'image */}
          <button onClick={handleDownload}>Télécharger l'image</button> {/* Ajouter un bouton pour télécharger l'image */}

          <p>Description: {emploi.description} </p>
          <p>Type de cours: {emploi.typedecour}</p>
        </div>
      </div>
    </div>
  );
 }
 function Emplois() {
  const [emplois, setEmplois] = useState([]);
  const [error, setError] = useState(null);
  const [emploisPresentiels, setEmploisPresentiels] = useState([]);
  const [emploisEnLigne, setEmploisEnLigne] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:3001/emplois')
      .then(response => {
        if (Array.isArray(response.data)) {
          setEmplois(response.data);
          // Séparer les emplois selon leur type de cours
          const presentiels = response.data.filter(emploi => emploi.typedecour === 'Présentiel');
          const enLigne = response.data.filter(emploi => emploi.typedecour === 'En ligne');
          setEmploisPresentiels(presentiels);
          setEmploisEnLigne(enLigne);
        } else {
          setError('La réponse du serveur n\'est pas un tableau JSON.');
        }
      })
      .catch(error => {
        setError('Erreur lors de la récupération des emplois du temps: ' + error.message);
      });
  }, []);
  

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
                      Formations
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/Accelerer">Cours Accéléré</Dropdown.Item>
                      <Dropdown.Item href="/complet">Cours Complet</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="createur">Créateurs</a>
                </li>
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle id="navbarDropdown">
                      Emplois du temps
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/pres">Emplois Présenteil</Dropdown.Item>
                      <Dropdown.Item href="/enligne">Emplois en Ligne</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact">Contact</a>
                </li>
                <div className="search-right">
                  <a href="/" className="btn button-style" title="search">Sortir</a>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    
      <div className="inner-banner">
        <section className="w3l-breadcrumb">
          <div className="container">
            <h4 className="inner-text-title font-weight-bold mb-sm-3 mb-2">Emploi du temps</h4>
            <ul className="breadcrumbs-custom-path">
              <li><a href="index.html">Acceuil</a></li>
              <li className="active"><span className="fa fa-chevron-right mx-2" aria-hidden="true"></span>Emploi du temps</li>
            </ul>
          </div>
        </section>
      </div>  
      
      <div className="w3l-grids-block-5 py-5">
        <section id="grids5-block" className="pt-md-4 pb-md-5 py-4 mb-5">
          <div className="container">
            <div className="title-main text-center mx-auto mb-4">
              <h3 className="title-big"> Emplois du temps</h3>
              <p className="sub-title mt-2"><strong>Yalla Digital Academy</strong>  s'engage à fournir régulièrement des emplois du temps actualisés à chaque semestre pour ses étudiants,
                ainsi qu'à maintenir les mises à jour sur le site web pour assurer l'accessibilité des emplois du temps les plus récents</p>
            </div>
            <div>
            <br/>
      <br/>
      {/* Render section for présentiel */}
      <section className="section-presentiels">
        <h2>Emplois du temps en présentiel</h2>
        <br/>
        <br/>
        <div className="container">
          <div className="row">
            {emploisPresentiels.map((emploi, index) => (
              <EmploiDuTemps
                key={index}
                emploi={emploi} 
                titre={emploi.titre}
                description={emploi.description}
                typedecour={emploi.typedecour}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Render section for en ligne */}
      <br/>
      <br/>
      <section className="section-en-ligne">
        <h2>Emplois du temps en ligne</h2>
        <br/>
        <div className="container">
          <div className="row">
            {emploisEnLigne.map((emploi, index) => (
              <EmploiDuTemps
                key={index}
                emploi={emploi} 
                titre={emploi.titre}
                description={emploi.description}
                typedecour={emploi.typedecour}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
          </div>
        </section>
      </div>

      <footer className="w3l-footer-22 position-relative mt-5 pt-5">
        <div className="footer-sub">
          <div className="container">
            <div className="text-txt">
              <div className="row sub-columns align-items-center">
                {/* Première colonne */}
                <div className="col-lg-4 col-md-4 col-sm-12 sub-one-left">
                  <img
                    src="src/assets/images/yallalogo.png"
                    className="footer-image img-fluid"
                    alt="Footer Image"
                    style={{ maxWidth: '200px' }}
                  />
                  <p>Dans notre école dynamique et novatrice, nous visons à développer les compétences
                    clés pour créer des contenus exceptionnels, riches en inspiration</p>
                  <div className="columns-2">
                    <ul className="social">
                      <li><a href="https://www.facebook.com/profile.php?id=100095263917513&amp;mibextid=LQQJ4d"><span className="fa fa-facebook" aria-hidden="true"></span></a></li>
                      <li><a href="https://instagram.com/yalla_digital_academy?igshid=MzRlODBiNWFlZA=="><span className="fa fa-instagram" aria-hidden="true"></span></a></li>
                      <li><a href="https://www.tiktok.com/@yalla.digital.academy?_t=8ekU1rsalE6&_r=1"> <img src="src/assets/images/tiktok-16.png" alt="TikTok" /> </a></li>
                      <li><a href="https://www.linkedin.com/company/yalla-digital-academy/posts/?feedView=all"><span className="fa fa-linkedin" aria-hidden="true"></span></a></li>
                      <li><a href="https://www.youtube.com/@YallaDigitalAcademy"><span className="fa fa-youtube" aria-hidden="true"></span></a></li>
                    </ul>
                  </div>
                </div>

                {/* Deuxième colonne */}
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    {/* Sous-colonne pour "Quick links" */}
                    <div className="col-lg-6 col-md- col-sm-6 sub-two-right">
                      <h6>Liens rapides</h6>
                      <ul>
                        <li><a href="/"><span className="fa fa-angle-double-right mr-2"></span>Acceuil</a></li>
                        <li><a href="apropos"><span className="fa fa-angle-double-right mr-2"></span>À propos</a></li>
                        <li><a href="createur"><span className="fa fa-angle-double-right mr-2"></span>Créateurs</a></li>
                        <li><a href="contact"><span className="fa fa-angle-double-right mr-2"></span>Contact</a></li>
                      </ul>
                    </div>

                    {/* Sous-colonne pour "Contact" */}
                    <div className="col-lg-6 col-md- col-sm-6 sub-one-left">
                      <h6>Contact</h6>
                      <div className="column2">
                        <div className="href1"><span className="fa fa-envelope-o" aria-hidden="true"></span><a href="mailto:info@example.com">Yalladigitalacademy@gmail.com</a></div>
                        <div className="href2"><span className="fa fa-phone" aria-hidden="true"></span><a href="tel:+216 56 340 161">+216 56 340 161</a></div>
                        <p className="contact-para"><span className="fa fa-map-marker" aria-hidden="true"></span><a href="https://maps.app.goo.gl/MGR32vQN53BYYnSC9"> ZI Chotrana II 2083 Cité El Ghazala</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-footer text-center">
          <div className="container">
            <div className="columns">
              <p> <a href="https://w3layouts.com/" target="_blank"> </a></p>
              <p> <a href="https://w3layouts.com/" target="_blank"> </a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Emplois;
