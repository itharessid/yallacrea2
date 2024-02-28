import React from 'react'
import './contact.css'
function contact() {
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
      
                <button className="navbar-toggler  collapsed bg-gradient" type="button" data-toggle="collapse"
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
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                             Formation </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                     <a className="dropdown-item" href="/Accelerer">Cours Accéléré</a>
                     <a className="dropdown-item" href="/complet ">Cours Complet</a>
                    </div>
                     </li>
                        <li className="nav-item">
                            <a className="nav-link" href="createur">Créateur</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="contact">Contact</a>
                        </li>
                        
                        <div className="search-right">
                            <a href="#search" className="btn button-style" title="search">SeConnecter</a>
                            
                            <div id="search" className="pop-overlay">
                                <div className="popup">
                                    <h4 className="search-pop-text-w3 text-white text-center mb-4">Search Here Your
                                        Online Course
                                    </h4>
                                    <form action="#error" method="GET" className="search-box">
                                        <div className="input-search"> <span className="fa fa-search mr-2"
                                                aria-hidden="true"></span><input type="search"
                                                placeholder="Enter Keyword" name="search" required="required"
                                                autofocus=""/>
                                        </div>
                                        <button type="submit" className="btn button-style">Search</button>
                                    </form>
                                </div>
                                <a className="close" href="#close">×</a>
                            </div>
                          
                        </div>
                       
                    </ul>
                </div>
                
                <div className="cont-ser-position">
                    <nav className="navigation">
                        <div className="theme-switch-wrapper">
                            <label className="theme-switch" for="checkbox">
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
       
        <section className="w3l-breadcrumb">
            <div className="container">
                <h4 className="inner-text-title font-weight-bold mb-sm-3 mb-2">Contact </h4>
                <ul className="breadcrumbs-custom-path">
                    <li><a href="index.html">Acceuil</a></li>
                    <li className="active"><span className="fa fa-chevron-right mx-2" aria-hidden="true"></span> Contact </li>
                </ul>
            </div>
        </section>
   
    <section class="contact py-5" id="contact">
        <div class="container py-md-4 py-3">
            
            <div class="main-grid-contact">
                <div class="row mt-5 mx-0">
                  
                    <div class="col-lg-6 map mt-lg-0 mt-3">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6380.985941731756!2d10.1925479!3d36.9024761!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2cb004b721297%3A0x5c7f3066db4365cf!2sYalla%20Digital%20Academy!5e0!3m2!1sfr!2stn!4v1708950730525!5m2!1sfr!2stn"
                            allowfullscreen></iframe>
                          
                    </div>
                    
                    
                    <div className="col-lg-6 content-form-right p-0">
    <div className="form-w3ls p-md-5 p-4">
        <h4 className="mb-4 sec-title-w3">Envoyez-nous un message</h4>
        <form method="post" action="https://sendmail.w3layouts.com/submitForm">
            <div className="row">
                <div className="col-sm-6 form-group pr-sm-1">
                    <input className="form-control" type="text" name="w3lName" id="w3lName"
                        placeholder="Nom" required=""/>
                </div>
                <div className="col-sm-6 form-group pl-sm-1">
                    <input className="form-control" type="text" name="w3lName" id="w3lName"
                        placeholder="Prénom" required=""/>
                </div>
            </div>
            <div className="form-group">
                <input className="form-control" type="email" name="w3lSender" id="w3lSender"
                    placeholder="Email" required=""/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" name="w3lName" id="w3lName"
                    placeholder="Numéro de téléphone" required=""/>
            </div>
            <div className="form-group">
                <textarea className="form-control" name="w3lMessage" id="w3lMessage"
                    placeholder="Message" required=""></textarea>
            </div>
            <div className="input-group1 text-right">
                <button className="btn button-style" type="submit">Envoyer
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </button>
            </div>
        </form>
    </div>
</div>
                </div>
            </div>
        </div>
    </section>
            
            <footer className="w3l-footer-22 position-relative mt-5 pt-5">
        <div className="footer-sub">
          <div className="container">
            <div className="text-txt">
              <div className="row sub-columns align-items-center">
                {/* Première colonne */}
                <div className="col-lg-4 col-md-6 col-sm-12 sub-one-left">
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
                    </ul>
                  </div>
                </div>

                {/* Deuxième colonne */}
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    {/* Sous-colonne pour "Quick links" */}
                    <div className="col-lg-6 col-md-6 col-sm-6 sub-two-right">
                      <h6>Quick links</h6>
                      <ul>
                        <li><a href="/"><span className="fa fa-angle-double-right mr-2"></span>Acceuil</a></li>
                        <li><a href="apropos"><span className="fa fa-angle-double-right mr-2"></span>Apropos</a></li>
                        <li><a href="createur"><span className="fa fa-angle-double-right mr-2"></span>Createur</a></li>
                        <li><a href="contact"><span className="fa fa-angle-double-right mr-2"></span>Contact</a></li>
                      </ul>
                    </div>

                    {/* Sous-colonne pour "Contact" */}
                    <div className="col-lg-6 col-md-6 col-sm-6 sub-one-left">
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

export default contact
