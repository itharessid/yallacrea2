import React from 'react'
import { Dropdown } from 'react-bootstrap';
function detail() {
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
                        <a className="nav-link" href="createur">Créateur</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="contact">Contact</a>
                    </li>
                    <div className="search-right">
                        <a href="preInscri" className="btn button-style">S'inscrire</a>
                        <div id="search" className="pop-overlay">
                            <div className="popup">
                                <h4 className="search-pop-text-w3 text-white text-center mb-4">Search Here Your Online Course</h4>
                                <form action="#error" method="GET" className="search-box">
                                    <div className="input-search">
                                        <span className="fa fa-search mr-2" aria-hidden="true"></span>
                                        <input type="search" placeholder="Enter Keyword" name="search" required="required" autoFocus />
                                    </div>
                                    <button type="submit" className="btn button-style">Search</button>
                                </form>
                            </div>
                            <a className="close" href="#close">×</a>
                        </div>
                    </div>
                </ul>
            </div>

        </nav>
    </div>
</header>
<div className="inner-banner">
        <section className="w3l-breadcrumb">
        <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-12">
                            <div className="row">
                                <div className="col-lg-3 col-12">
                                    <div className="custom-block-icon-wrap">
                                        <div className="custom-block-image-wrap custom-block-image-detail-page">
                                            <img src="src/assets/images/c1.jpg" className="custom-block-image img-fluid" alt=""/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-9 col-12">
                                    <div className="custom-block-info">
                                        <div className="custom-block-top d-flex mb-1">
                                            <small className="me-4">
                                                <a href="#">
                                                    <i className="bi-play"></i>
                                                    Play now
                                                </a>
                                            </small>

                                            <small>
                                                <i className="bi-clock-fill custom-icon"></i>
                                                50 Minutes
                                            </small>

                                            <small className="ms-auto">Episode <span className="badge">15</span></small>
                                        </div>

                                        <h2 className="mb-2">Modern Vintage</h2>

                                        <p>What is Content Marketing? If you are wondering what content marketing is all about, this is the place to start.</p>

                                        <p>You are not allowed to redistribute this template ZIP file on any other template collection website. Please contact TemplateMo for more information.</p>

                                        <p>Pod Talk HTML CSS Template is made by Bootstrap v5.2.2 framework. You are allowed to modify and use this template for your business websites.</p>

                                        <div className="profile-block profile-detail-block d-flex flex-wrap align-items-center mt-5">
                                            <div className="d-flex mb-3 mb-lg-0 mb-md-0">
                                                <img src="src/assets/images/c1.jpg" className="profile-block-image img-fluid" alt=""/>
                                                <p>
                                                  itsbahahaouas
                                                    <img src="images/verified.png" className="verified-image img-fluid" alt=""/>
                                                    <strong>Création de vidéos</strong>
                                                </p>
                                            </div>

                                            <ul className="social-icon ms-lg-auto ms-md-auto">
                                                <li className="social-icon-item">
                                                    <a href="https://www.facebook.com/baha.haouas.9/" className="social-icon-link fa fa-facebook"></a>
                                                </li>

                                                <li className="social-icon-item">
                                                    <a href="https://www.instagram.com/itsbahahaouas/" className="social-icon-link fa fa-instagram"></a>
                                                </li>

                                                <li className="social-icon-item">
                                                <a href="https://www.tiktok.com/@justbahahaouas?is_from_webapp=1&sender_device=pc" className="social-icon-link">
                                                    <img src="src/assets/images/tiktok-16.png" alt="TikTok" />
                                                   </a>                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

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

export default detail
