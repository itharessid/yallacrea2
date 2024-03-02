import React, { Suspense } from 'react'
import './complet.css'
import { Dropdown } from 'react-bootstrap';




function complet() {
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
                            <a href="#search" className="btn button-style" title="search">S'inscrire</a>
                            
                            <div id="search" className="pop-overlay">
                                <div className="popup">
                                    <h4 className="search-pop-text-w3 text-white text-center mb-4">Search Here Your
                                        Online Course
                                    </h4>
                                    <form action="#error" method="GET" className="search-box">
                                        <div className="input-search"> <span className="fa fa-search mr-2"
                                                aria-hidden="true"></span><input type="search" placeholder="Enter Keyword" name="search" required="required" autoFocus />

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
                    <li><a href="/">Acceuil</a></li>
                    <li className="active"><span className="fa fa-chevron-right mx-2" aria-hidden="true"></span>A Propos</li>
                    <br/>
                    <br/>
                    <br/>
                    <h3 className="inner-text-title font-weight-bold mb-sm-3 mb-2"> Nos Spécialités</h3>
                </ul>
            </div>
        </section>
        
    </div> 
     <section className="about-block-3 py-5">
        <div className="grids-w3ovt py-md-4 py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-md-0 mb-5">
                        <div className="bg-color-block-2">
                        <div className="cardBox">
                          <div className="card">
                          <div className="h4">Creative visionary</div>
         
                           <div className="content">
                          <div className="h3">Creative visionary</div>
                          <p>Création et manipulation de contenus visuels captivants pour raconter des histoires à travers l'art de l'image.</p>
                               </div>
                                </div>
                               </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-md-0 mb-5">
                        <div className="bg-color-block-2">
                        <div className="cardBox">
                           <div className="card">
                      <div className="h4">sound sculptor</div>
         
                     <div className="content">
                          <div className="h3">Sound sculptor</div>
                      <p>Création, enregistrement et production de compositions musicales de qualité</p>
                       </div>
                        </div>
                           </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="bg-color-block-2">
                        <div className="cardBox">
                        <div className="card">
                        <div className="h4">Digital dynamo</div>
         
                     <div className="content">
                          <div className="h3">Digital dynamo</div>
                          <p>Création et diffusion de contenu de qualité pour attirer, engager et fidéliser un public, tout en renforçant la visibilité et l'autorité d'une marque ou d'une entreprise.</p>
                        </div>
                          </div>
                         </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="about-block-3 py-5">
        <div className="grids-w3ovt py-md-4 py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-md-0 mb-5">
                        <div className="bg-color-block-2">
                        <div className="cardBox">
                          <div className="card">
                          <div className="h4">Copywriting luminary</div>
         
                           <div className="content">
                          <div className="h3">Copywriting luminary</div>
                          <p>Rédaction persuasive et convaincante pour une communication efficace avec le public cible.</p>
                               </div>
                                </div>
                               </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-md-0 mb-5">
                        <div className="bg-color-block-2">
                        <div className="cardBox">
                           <div className="card">
                      <div className="h4">Graphical Genius</div>
         
                     <div className="content">
                          <div className="h3">Graphical Genius</div>
                      <p>Conception de supports visuels attractifs avec divers éléments et logiciels graphiques.</p>
                       </div>
                        </div>
                           </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="bg-color-block-2">
                        <div className="cardBox">
                        <div className="card">
                        <div className="h4">Gameplay Innovator</div>
         
                     <div className="content">
                          <div className="h3">Gameplay Innovator</div>
                          <p>Conception de personnages, programmation, animation et élaboration de scénarios pour les jeux vidéo.</p>
                        </div>
                        </div>
                         </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div className="inner-banner">
    <section className="w3l-breadcrumb">
        <div className="container">
            <h4 className="inner-text-title font-weight-bold mb-sm-3 mb-2">Programmes d’échange</h4> 
        </div>
    </section>
    <section className="w3l-text-6 py-5" id="about">
        <div className="text-6-mian py-md-4 py-3">
            <div className="container">
                <div className="row top-cont-grid align-items-center">
                    <div className="col-lg-6 left-img pr-lg-4">
                    <img src="src/assets/images/airplane.png" alt="" class="img-responsive img-fluid" />
                    </div>
                    <div className="col-lg-6 text-6-info mb-lg-0 mb-4 pl-lg-5">
                        <h6>Programmes d’échange</h6>
                        <h2>Yalla Digital Academy </h2>
                        <p> vous ouvre les portes d'un monde de découvertes et d'aventures 
                          à travers des programmes d'échange à l'étranger. Rencontrez des professionnels de la création de contenu,
                           élargissez vos connaissances et vivez des expériences 
                          uniques dans des destinations exotiques. Nous vous accompagnons tout au long de votre parcours</p>
                        <a href="#blog"className="btn button-style mt-sm-5 mt-4">S'inscrire<i
                            className="fa fa-angle-double-right" aria-hidden="true"></i></a>
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
    </div>
  )
}

export default complet
