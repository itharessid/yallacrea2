import React from 'react'
import { Dropdown } from 'react-bootstrap';
import './accelere.css';

function accelere() {
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
      
                <button className="navbar-toggler collapsed bg-gradient" type="button" data-toggle="collapse"
            data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
            <span className="navbar-toggler-icon fa icon-close fa-times"></span>
          </button>

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
                
                <div className="cont-ser-position">
                    <nav className="navigation">
                        <div className="theme-switch-wrapper">
                            <label className="theme-switch" htmlFor="checkbox">
                                <input type="checkbox" id="checkbox"/>
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
            <br/>
            <br/>
            <br/>
            <div className="inner-banner">
        <section className="w3l-breadcrumb">
            <div className="container">
                <h4 className="inner-text-title font-weight-bold mb-sm-3 mb-2">Cours Accéléré</h4>
                <ul className="breadcrumbs-custom-path">
                  <br/>
                  
                    <li><a href="/">Acceuil</a></li>
                    <li className="active"><span className="fa fa-chevron-right mx-2" aria-hidden="true"></span>Cours Accéléré</li>
                </ul>
            </div>
        </section>
    </div>
            <div className="w3l-index-block4 pb-5">
        <div className="features-bg pb-lg-5 pt-lg-4 py-4">
            <div className="container">

                <div className="row">
                    <div className="col-lg-4 col-md-6 features15-col-text">
                    <div className="cardacc">
         <div className="iconacc">
         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="48px" width="48px" version="1.1" id="number" viewBox="0 0 48 48" xml:space="preserve">
    <linearGradient id="gradientColor">
        <stop offset="5%" stop-color="#7eaaff"></stop>
        <stop offset="95%" stop-color="#ff48fb"></stop>
    </linearGradient>
    <g>
        <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="32" fill="#ffffff">3</text>
    </g>
</svg>

  </div>
  <p className="titleacc">mois</p>
  <p className="textacc">Creative Ace</p>
</div>
                    </div>
                    <div className="col-lg-4 col-md-6 features15-col-text">
                    <div className="cardacc">
         <div className="iconacc">
         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="48px" width="48px" version="1.1" id="number" viewBox="0 0 48 48" xml:space="preserve">
    <linearGradient id="gradientColor">
        <stop offset="5%" stop-color="#7eaaff"></stop>
        <stop offset="95%" stop-color="#ff48fb"></stop>
    </linearGradient>
    <g>
        <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="32" fill="#ffffff">6</text>
    </g>
</svg>
  </div>
  <p className="titleacc">mois</p>
  <p className="textacc">Idea Maven</p>
</div>
                    </div>
                    <div class="col-lg-4 col-md-6 features15-col-text">
                    <div className="cardacc">
         <div className="iconacc">
         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="48px" width="48px" version="1.1" id="number" viewBox="0 0 48 48" xml:space="preserve">
    <linearGradient id="gradientColor">
        <stop offset="5%" stop-color="#7eaaff"></stop>
        <stop offset="95%" stop-color="#ff48fb"></stop>
    </linearGradient>
    <g>
        <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="32" fill="#ffffff">1</text>
    </g>
</svg>
  </div>
  <p className="titleacc">an</p>
  <p className="textacc">Content Master</p>
                    </div>
                    </div>   
                </div>
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

export default accelere
