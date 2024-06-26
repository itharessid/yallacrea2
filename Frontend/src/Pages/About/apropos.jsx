import React from 'react'
import './apropos.css'
import { Dropdown } from 'react-bootstrap';
import Partencop from './partencop'; // Import the partencop component
import EventCompt from './eventcompt';

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

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-lg-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Acceuil <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="apropos">A propos</a>
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
                </Dropdown></li>

                        <li className="nav-item">
                            <a className="nav-link" href="createur">Créateurs</a>
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
                        <img src="src/assets/images/nou.jpg" alt="" class="img-responsive img-fluid" />
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

       <EventCompt />
       
<div className="w3l-grids-block-5 py-5">
        <section id="grids5-block" class="pt-md-4 pb-md-5 py-4 mb-5">
            <div className="container">
                <div className="title-main text-center mx-auto mb-4">
                    <h3 className="title-big">NOS CERTIFICATIONS</h3>
                    <p className="sub-title mt-2"><strong>Yalla Digital Academy</strong> intègre des certifications dans sa démarche qualité,
                           garantissant à ses étudiants une reconnaissance internationale de leurs compétences,
                         en s'engageant fermement envers l'excellence académique</p>

                </div>
                <div className="row mt-sm-5 pt-lg-2">
    <div className="col-lg-4 col-sm-6">
        <div className="grids5-info">
            <a href="#blog" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <img src="src/assets/images/logRO.png" alt="" style={{ maxWidth: '60%', maxHeight: '100%' }} />
            </a>
            <div className="blog-info">
            <h5>Rosetta Stone</h5>
            <br/>
                <p>À Yalla Digital Academy, nous comprenons l'importance de choisir une formation 
                    linguistique adaptée à vos besoins et à votre niveau.<br/> 
                    Notre équipe est là pour vous guider dans le choix de la formation idéale. 
                    Notre objectif est de vous aider à développer vos compétences linguistiques jusqu'à un niveau professionnel en écriture</p>
               
            </div>

        </div>
    </div>
    <div className="col-lg-4 col-sm-6 mt-sm-0 mt-4">
        <div className="grids5-info">
            <a href="#blog" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <img src="src/assets/images/coursera.png" alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </a>
            <div className="blog-info">
            <h5>COURSERA</h5>
            <br/>
            
                <h4><a href="#blog"></a></h4>
                <p>Yalla Digital Academy encourage sans cesse de nouvelles opportunités d'apprentissage pour ses étudiants,
                     nécessitant une pédagogie innovante de ses enseignants. <br/>En tant que partenaire officiel de Coursera, l'école mobilise
                     son équipe pédagogique vers une culture numérique axée sur l'innovation grâce à la plateforme Coursera</p>
            </div>
            
        </div>
    </div>
    <div className="col-lg-4 col-sm-6 mt-lg-0 mt-4">
        <div className="grids5-info">
            <a href="#blog" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <img src="src/assets/images/udemy.jpg" alt="" style={{ maxWidth: '70%', maxHeight: '100%' }} />
            </a>
            <div className="blog-info">
                <h5>Udemy</h5>
                <br/>
               
                <h4><a href="#blog"></a></h4>
                <p>Yalla Digital Academy a récemment introduit un programme de certification Udemy 
                    pour fournir des compétences clés dans le domaine technologique en constante évolution.<br/> 
                    Cette certification vous donne les connaissances nécessaires pour utiliser efficacement les technologies associées, 
                    ajoutant ainsi de la valeur à votre entreprise et vous aidant à relever les défis pratiques au quotidien.</p>
            </div>
        </div>
    </div>
</div>
            </div>
        </section>
    </div>

      <Partencop />
 
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
                        <li><a href="apropos"><span className="fa fa-angle-double-right mr-2"></span>A propos</a></li>
                        <li><a href="createur"><span className="fa fa-angle-double-right mr-2"></span>Createurs</a></li>
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

export default apropos
