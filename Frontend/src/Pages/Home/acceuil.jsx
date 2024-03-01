import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';
import './acceuil.css';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


function acceuil() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const app = new Application(canvas);
    app.load('https://prod.spline.design/IBs51OvNPwMudznz/scene.splinecode');
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

            <button className="navbar-toggler collapsed bg-gradient" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">
                    <FontAwesomeIcon icon={faBars} />
                </span>
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
                        </Dropdown>
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
            <section id="home" className="w3l-banner py-5">
      <div className="container pt-5 pb-md-4">
        <div className="row align-items-center">
          <div className="">
          <h3 className="mb-sm-5 mb-2 title">Yalla <br/>Digital <span className="type-js"><span
                                        className="text-js">Academy</span></span></h3>
                                       
                       <p className="smaller-text">Vous avez perturbé dans votre route, alors donnez vie à votre créativité.
                      <br/> <strong><span className="bigger-word">Yalla,</span></strong> rejoignez-nous dès maintenant pour débuter votre parcours créatif.</p>
            <div className="mt-md-5 mt-4 mb-lg-0 mb-4">
              <a className="btn button-style" href="About.jsx">S'inscrire<i className="fa fa-angle-double-right" aria-hidden="true"></i></a>
            </div>
          </div>
          <div className="col-md-6 banner-right mt-md-0 mt-4">
            <canvas ref={canvasRef}  width="500" height="500"></canvas>
          </div>
        </div>
      </div>
    </section>
    <section className="w3l-servicesblock py-md-5 py-4">
        <div className="container pb-2">
            <div className="row align-items-center">
                <div className="col-lg-6 left-wthree-img pr-lg-4">
                    <img src="assets/images/img1.jpg" alt="" className="img-fluid"/>
                </div>
                <div className="col-lg-6 about-right-faq align-self mb-lg-0 mb-5 pl-xl-5">
                    
                <h3 className="title-big mb-3">Découvrire <br/><span className="yalla-word">Yalla</span></h3>
                    <p className="">Découvrez une révolution éducative en Tunisie avec la première école de créateurs de contenu,
                     redéfinissant l'expérience éducative pour vous offrir une formation novatrice et inspirante.</p>
                   
                    <a className="btn button-style button-2 mt-lg-5 mt-4" href="apropos">Découvrir plus
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    </section>
    <section className="w3l-teams-32-main py-5">
        <div className="teams-32 py-md-4">
            <div className="container">
                <div className="title-main text-center mx-auto mb-4">
                    <h3 className="title-big">Nous Experts</h3>
                    <p className="sub-title mt-2">Cum doctus civibus efficiantur in imperdiet deterruisset. Cras efficitur,
                        metus
                        gravida suscipit cursus, dui diam pre lorem id
                        lectus.</p>
                </div>
                <div className="row main-contteam-32 mt-sm-5 pt-lg-2">
                    <div className="col-lg-3 col-6 team-main-19">
                        <div className="column-19">
                            <a href="#team"><img className="img-fluid" src="assets/images/team1.jpg" alt=" "/></a>
                        </div>
                        <div className="right-team-9">
                            <h6><a href="#team" className="title-team-32">Chris Tina</a></h6>
                            <p className="sm-text-32">Web Designer</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6 team-main-19">
                        <div className="column-19">
                            <a href="#team"><img className="img-fluid" src="assets/images/team2.jpg" alt=" "/></a>
                        </div>
                        <div className="right-team-9">
                            <h6><a href="#team" className="title-team-32">Diego Mota</a></h6>
                            <p className="sm-text-32">CSS, HTML</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6 team-main-19">
                        <div className="column-19">
                            <a href="#team"><img className="img-fluid" src="assets/images/team3.jpg" alt=" "/></a>
                        </div>
                        <div className="right-team-9">
                            <h6><a href="#team" className="title-team-32">Anton Bone</a></h6>
                            <p className="sm-text-32">UI/UX Designer</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6 team-main-19">
                        <div className="column-19">
                            <a href="#team"><img className="img-fluid" src="assets/images/team4.jpg" alt=" "/></a>
                        </div>
                        <div className="right-team-9">
                            <h6><a href="#team" className="title-team-32">Neoye Achi</a></h6>
                            <p className="sm-text-32">Web Developer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section  className="w3l-companies-hny-6 position-relative">
        <div  className="cusrtomer-layout py-5">
        
            <div  className="scontainer py-md-4 py-3">
                <div  className="title-heading-w3 text-center mx-auto">
                    <h3  className="title-big">Témoignage</h3>
                </div>
                <div id="owl-demo1"  className="owl-carousel owl-theme mt-5">
                    <div  className="item">
                        <div  className="testimonial-content">
                            <div  className="testimonial">
                                <div  className="testi-des">
                                    <div  className="test-img"><img src="src/assets/images/testi2.jpg" className="img-fluid" alt="/"/>
                                    </div>
                                    <div  className="peopl">
                                        <h3>Jenna John</h3>
                                        <p  className="indentity">Washington</p>
                                    </div>
                                </div>
                                <blockquote>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam.</p>
                                </blockquote>
                                <blockquote></blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div  className="testimonial-content">
                            <div  className="testimonial">
                                <div  className="testi-des">
                                    <div  className="test-img"><img src="src/assets/images/testi1.jpg" className="img-fluid" alt="/"/>
                                    </div>
                                    
                                    <div  className="peopl">
                                        <h3>Theo Hall</h3>
                                        <p  className="indentity">Washington</p>
                                    </div>
                                </div>
                                <blockquote>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam.</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div  className="item">
                        <div className="testimonial-content">
                            <div  className="testimonial">
                                <div className="testi-des">
                                    <div  className="test-img"><img src="src/assets/images/testi3.jpg" className="img-fluid" alt="/"/>
                                    </div>
                                    <div className ="peopl">
                                        <h3>Linda Carini</h3>
                                        <p  className="indentity">Washington</p>
                                    </div>
                                </div>
                                <blockquote>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem aperiam,.</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="quote-special">
                <i className="fa fa-instagram" aria-hidden="true"></i>
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

export default acceuil
