import React from 'react'
import './apropos.css'
function apropos() {
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
                                                aria-hidden="true"></span>
                                          <input type="search" placeholder="Enter Keyword" name="search" required="required" autoFocus={true} />

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
            
            <div className="inner-banner">
        <section className="w3l-breadcrumb">
            <div className="container">
                <h4 className="inner-text-title font-weight-bold mb-sm-3 mb-2">A Propos</h4>
                <ul className="breadcrumbs-custom-path">
                    <li><a href="index.html">Acceuil</a></li>
                    <li className="active"><span className="fa fa-chevron-right mx-2" aria-hidden="true"></span>A Propos</li>
                </ul>
            </div>
        </section>
    </div>
   
    <section className="w3l-text-6 py-5" id="about">
        <div className="text-6-mian py-md-4 py-3">
            <div className="container">
                <div className="row top-cont-grid align-items-center">
                    <div className="col-lg-6 left-img pr-lg-4">
                        <img src="assets/images/about.jpg" alt="" class="img-responsive img-fluid" />
                    </div>
                    <div className="col-lg-6 text-6-info mb-lg-0 mb-4 pl-lg-5">
                        <h6>QUI SOMMES NOUS ?</h6>
                        <h2>Yalla   <span>DIGITAL Academy</span></h2>
                        <p> est une école passionnée et novatrice dédiée à l'enseignement des 
                          compétences essentielles pour produire un contenu inspirant de haute qualité.</p>
                    </div>
                </div>
            </div>
        </div>
       </section>
       <section className="w3l-teams-32-main py-5">
    <div className="teams-32 py-md-4">
        <div className="container">
            <div className="title-main text-center mx-auto mb-4">
                <h3 className="title-big">NOS ACTIVITÉS</h3>
            </div>
            <section className="topics-section section-padding pb-0" id="section_3">
                <div className="container">
                    <div className="row">



                        <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div className="custom-block custom-block-overlay">
                                <a href="detail-page.html" class="custom-block-image-wrap">
                                    <img src="images/topics/physician-consulting-his-patient-clinic.jpg" className="custom-block-image img-fluid" alt=""/>
                                </a>

                                <div className="custom-block-info custom-block-overlay-info">
                                    <h5 className="mb-1">
                                        <a href="listing-page.html">
                                            Productivity
                                        </a>
                                    </h5>

                                    <p className="badge mb-0">50 Episodes</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div className="custom-block custom-block-overlay">
                                <a href="detail-page.html" class="custom-block-image-wrap">
                                    <img src="images/topics/repairman-doing-air-conditioner-service.jpg" className="custom-block-image img-fluid" alt=""/>
                                </a>

                                <div className="custom-block-info custom-block-overlay-info">
                                    <h5 className="mb-1">
                                        <a href="listing-page.html">
                                            Technician
                                        </a>
                                    </h5>

                                    <p className="badge mb-0">12 Episodes</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div className="custom-block custom-block-overlay">
                                <a href="detail-page.html" className="custom-block-image-wrap">
                                    <img src="images/topics/woman-practicing-yoga-mat-home.jpg" className="custom-block-image img-fluid" alt=""/>
                                </a>

                                <div className="custom-block-info custom-block-overlay-info">
                                    <h5 className="mb-1">
                                        <a href="listing-page.html">
                                            Mindfullness
                                        </a>
                                    </h5>

                                    <p className="badge mb-0">35 Episodes</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div className="custom-block custom-block-overlay">
                                <a href="detail-page.html" className="custom-block-image-wrap">
                                    <img src="images/topics/delicious-meal-with-sambal-arrangement.jpg" className="custom-block-image img-fluid" alt=""/>
                                </a>

                                <div className="custom-block-info custom-block-overlay-info">
                                    <h5 className="mb-1">
                                        <a href="listing-page.html">
                                            Cooking
                                        </a>
                                    </h5>

                                    <p className="badge mb-0">12 Episodes</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
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

export default apropos
