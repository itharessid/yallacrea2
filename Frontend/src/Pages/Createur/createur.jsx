import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { BiHeart } from 'react-icons/bi';

import './createur.css'
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
                    <div className="col-lg-6 left-img pr-lg-4">
                        <img src="assets/images/about.jpg" alt="" className="img-responsive img-fluid" />
                    </div>
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

           


            <div className="w3l-index-block4 pb-5">
        <div className="features-bg pb-lg-5 pt-lg-4 py-4">
            <div className="container">
                <div className="title-main text-center mx-auto mb-md-4">
                   
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 features15-col-text">
                        <div className="row align-items-center">
                        <div className="col-lg-4">
                            <fieldset>
                                <input type="text" name="keyword" className="searchText" placeholder="Recherche ..." autoComplete="on" required />
                            </fieldset>
                        </div>
                        </div>
                           
                    
                    </div>
                    <div className="col-lg-2 col-md-2 features15-col-text">
                    <fieldset>
                    <select name="Category" className="form-select" aria-label="Default select example" id="chooseCategory" onChange={() => this.form.click()}>
                <option>Tout Categories</option>
                   <option type="checkbox" name="option1" value="Music">Santé</option>
                   <option value="Digital">lois</option>
               <option value="Blockchain">Fashion</option>
</select>
                </fieldset>
                    </div>

                    <div className="col-lg-2 col-md-2 features15-col-text">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                    <div className="col-lg-2">                        
                            <fieldset>
                            <button className="main-button" style={{ color: 'white'}}>Rechercher</button>
                            </fieldset>
                        </div>
                   
                  
                        </div>
                       </div>
                       </div>
                    
                </div>
            </div>
        </div>
    </div>
           
        </div>
        
    </div>
</div>
<section className="trending-podcast-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-12 mb-4 mb-lg-0">
                            <div className="custom-block custom-block-full">
                            <div className="custom-block-image-wrap text-center"> 

                                <div className="custom-block-image-wrap">
                                    <a href="detail-page.html">
                                        <img src="src/assets/images/c1.jpg" className="custom-block-image img-fluid" alt=""/>
                                    </a>
                                </div>
                                 </div>
                                <div className="custom-block-info">
                                    <h5 className="mb-2">
                                        <a href="detail-page.html">
                                          itsbahahaouas
                                        </a>
                                    </h5>

                                    


                                    <div className="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" className="bi-headphones me-1">
                                            <span>100k</span>
                                        </a>

                                        <a href="#" className="bi-heart me-1">
                                            <span>2.5k</span>
                                        </a>

                                        <a href="#" className="bi-chat me-1">
                                            <span>924k</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="social-share d-flex flex-column ms-auto">
                                    <a href="#" className="badge ms-auto">
                                        <i className="bi-heart"></i>
                                    </a>

                                    <a href="#" className="badge ms-auto">
                                        <i className="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-12 mb-4 mb-lg-0">
                            <div className="custom-block custom-block-full">
                                <div className="custom-block-image-wrap">
                                    <a href="detail-page.html">
                                        <img src="images/podcast/27670664_7369753.jpg" className="custom-block-image img-fluid" alt=""/>
                                    </a>
                                </div>

                                <div className="custom-block-info">
                                    <h5 className="mb-2">
                                        <a href="detail-page.html">
                                            Vintage Show
                                        </a>
                                    </h5>

                                    <div className="profile-block d-flex">
                                        <img src="images/profile/cute-smiling-woman-outdoor-portrait.jpg" className="profile-block-image img-fluid" alt=""/>

                                        <p>
                                            Taylor
                                            <img src="images/verified.png" className="verified-image img-fluid" alt=""/>
                                            <strong>Creator</strong>
                                        </p>
                                    </div>


                                    <div className="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" className="bi-headphones me-1">
                                            <span>100k</span>
                                        </a>

                                        <a href="#" className="bi-heart me-1">
                                            <span>2.5k</span>
                                        </a>

                                        <a href="#" className="bi-chat me-1">
                                            <span>924k</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="social-share d-flex flex-column ms-auto">
                                    <a href="#" className="badge ms-auto">
                                        <i className="bi-heart"></i>
                                    </a>

                                    <a href="#" className="badge ms-auto">
                                        <i className="bi-bookmark"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-12">
                            <div className="custom-block custom-block-full">
                                <div className="custom-block-image-wrap">
                                    <a href="detail-page.html">
                                        <img src="images/podcast/12577967_02.jpg" className="custom-block-image img-fluid" alt=""/>
                                    </a>
                                </div>

                                <div className="custom-block-info">
                                    <h5 className="mb-2">
                                        <a href="detail-page.html">
                                            Daily Talk
                                        </a>
                                    </h5>

                                    <div className="profile-block d-flex">
                                        <img src="images/profile/handsome-asian-man-listening-music-through-headphones.jpg" className="profile-block-image img-fluid" alt=""/>

                                        <p>
                                            William
                                            <img src="images/verified.png" className="verified-image img-fluid" alt=""/>
                                            <strong>Vlogger</strong></p>
                                    </div>


                                    <div className="custom-block-bottom d-flex justify-content-between mt-3">
                                        <a href="#" className="bi-headphones me-1">
                                            <span>100k</span>
                                        </a>

                                        <a href="#" className="bi-heart me-1">
                                            <span>2.5k</span>
                                        </a>

                                        <a href="#" className="bi-chat me-1">
                                            <span>924k</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="social-share d-flex flex-column ms-auto">
                                    <a href="#" className="badge ms-auto">
                                        <i className="bi-heart"></i>
                                    </a>

                                    <a href="#" className="badge ms-auto">
                                        <i className="bi-bookmark"></i>
                                    </a>
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
  )
}

export default createur
