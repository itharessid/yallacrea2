import React from 'react'
import { Dropdown } from 'react-bootstrap';
import './createur.css'
import Crea from './crea';


function createur() {
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
                </Dropdown></li>

                        <li className="nav-item">
                            <a className="nav-link" href="createur">Créateur</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="contact">Contact</a>
                        </li>
                        
                        <div className="search-right">
                            <a href="preInscri" className="btn button-style" title="search">S'inscrire</a>
                            
                          
                        </div>
                       
                    </ul>
                </div>
                
                
            </nav>
        </div>
            </header>
            <br/>
            <br/>
            <div className="inner-banner">
        <section className="w3l-breadcrumb">
            <div className="container">
                <h4 className="inner-text-title font-weight-bold mb-sm-3 mb-2">créateurs</h4>
                <ul className="breadcrumbs-custom-path">
                    <li><a href="/">Acceuil</a></li>
                    <li className="active"><span className="fa fa-chevron-right mx-2" aria-hidden="true"></span>créateurs</li>
                </ul>
            </div>
        </section>
    </div>
            <section className="w3l-text-6 py-5" id="about">
        <div className="text-6-mian py-md-4 py-3">
            <div className="container">
                <div className="row top-cont-grid align-items-center">
                    <div className="col-lg-5 left-img pr-lg-4">
                    <div>
                    <iframe
  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1313236633408551&show_text=0&width=560"
  width="400"
  height="600"
  style={{ border: 'none', overflow: 'hidden' }}
  frameBorder="0"
  allowTransparency={true}
  allowFullScreen={true}
></iframe>
    </div>                   </div>
                    <div className="col-lg-6 text-6-info mb-lg-0 mb-4 pl-lg-5">
                        <h6>Yalla DIGITAL Academy</h6>
                        <h2>Yalla créateurs<span></span></h2>
                        <p>Découvrez notre galerie  de créateurs de contenu talentueux, prêts à donner vie à vos projets avec leur expertise et leur créativité incomparables.</p>
                       
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div className="discover-items">
    <div className="container">
        <div className="row">
                <section className="w3l-breadcrumb">
                    <div className="container">
                        <h4 className="inner-text-title font-weight-bold mb-sm-3 mb-2 text-center">Découvrez Certains de Nos <em><span className="highlight">Créateurs</span></em></h4>
                    </div>
                    
                </section>
                <Crea/>


           
        </div>
        
    </div>
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
                      <h6>Quick links</h6>
                      <ul>
                        <li><a href="/"><span className="fa fa-angle-double-right mr-2"></span>Acceuil</a></li>
                        <li><a href="apropos"><span className="fa fa-angle-double-right mr-2"></span>Apropos</a></li>
                        <li><a href="createur"><span className="fa fa-angle-double-right mr-2"></span>Createur</a></li>
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
  )
}

export default createur
