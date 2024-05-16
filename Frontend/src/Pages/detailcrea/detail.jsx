
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './detail.css'
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin, FaYoutube } from 'react-icons/fa';

function Detail() {
    const { id } = useParams();
    const [createur, setCreateur] = useState(null);
   

    useEffect(() => {
        const fetchCreateurDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/createur/${id}`);
                setCreateur(response.data);
            } catch (error) {
                console.error('Error fetching createur details:', error);
            }
        };

        if (id) {
            fetchCreateurDetails();
        }
    }, [id]);

    if (!createur) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header id="site-header" className="fixed-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg stroke">
                        <h1>
                        <Link className="navbar-brand" to="/">
                                <img className="img-fluid" src="src/assets/images/yallalogo.png" alt="" style={{ maxWidth: '100px' }} />
                            </Link>
                        </h1>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-lg-auto">
                            <li className="nav-item active">
                                    <Link className="nav-link" to="/">Acceuil <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/apropos">À propos</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Dropdown>
                                        <Dropdown.Toggle id="navbarDropdown">
                                            Formations
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to="/Accelerer">Cours Accéléré</Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/complet">Cours Complet</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/createur">Créateurs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact</Link>
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
            <br/>

            <div className="inner-banner">
        <section className="w3l-breadcrumb">
            <div className="container">
                <h4 className="inner-text-title font-weight-bold mb-sm-3 mb-2">Détail de créateur </h4>
                <ul className="breadcrumbs-custom-path">
                  <br/>
                  
                    <li><a href="/">Acceuil</a></li>
                    <li className="active"><span className="fa fa-chevron-right mx-2" aria-hidden="true"></span>Détail de créateur</li>
                </ul>
            </div>
        </section>
        </div>

            <div className="inner-banner">
                        <section className="w3l-breadcrumb">
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 col-12">
                                        <div className="row">
                                            <div className="col-lg-3 col-12">
                                                <div className="custom-block-icon-wrap">
                                                    <div className="custom-block-image-wrap custom-block-image-detail-page">
                                                        <img src={`/photo/${createur.image}`} className="custom-block-image img-fluid" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-9 col-12">
                                    <div className="custom-block-info">
                                     <div className="custom-block-top d-flex mb-1"></div>
                                  <h2 className="mb-2">{createur.nom} </h2>
                                  <br/>
                                  <h2 className="mb-2"> {createur.prenom}</h2>

                                  <div style={{ textAlign: "left" }}>
                                      <p>{createur.description}</p>
                                  <p><strong>Email:</strong> {createur.email}</p>
                                <p><strong>Adresse:</strong> {createur.adresse}</p>
                                 <p><strong>Domaine:</strong> {createur.domaine}</p>
                                <div>
            <p><strong>Nombre de followers:</strong> {createur.nbFollowers}</p>
        </div>
        <ul className="social-icon ms-lg-auto ms-md-auto">

                {createur.lienFace && (
                    <li className="social-icon-item">
                        <a href={createur.lienFace} className="social-icon-link"><FaFacebook /></a>
                    </li>
                )}
                {createur.lienInsta && (
                    <li className="social-icon-item">
                        <a href={createur.lienInsta} className="social-icon-link"><FaInstagram /></a>
                    </li>
                )}
                {createur.lienTik && (
                    <li className="social-icon-item">
                        <a href={createur.lienTik} className="social-icon-link"><FaTiktok /></a>
                    </li>
                )}
            </ul>
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
                                <div className="col-lg-4 col-md-4 col-sm-12 sub-one-left">
                                    <img src="src/assets/images/nourch.jpg" className="footer-image img-fluid" alt="Footer Image" style={{ maxWidth: '200px' }} />
                                    <p>Dans notre école dynamique et novatrice, nous visons à développer les compétences clés pour créer des contenus exceptionnels, riches en inspiration</p>
                                    <div className="columns-2">
                                        <ul className="social">
                                            <li><a href="https://www.facebook.com/profile.php?id=100095263917513&amp;mibextid=LQQJ4d"><FaFacebook /></a></li>
                                            <li><a href="https://instagram.com/yalla_digital_academy?igshid=MzRlODBiNWFlZA=="><FaInstagram /></a></li>
                                            <li><a href="https://www.tiktok.com/@yalla.digital.academy?_t=8ekU1rsalE6&_r=1"><FaTiktok /></a></li>
                                            <li><a href="https://www.linkedin.com/company/yalla-digital-academy/posts/?feedView=all"><FaLinkedin /></a></li>
                                            <li><a href="https://www.youtube.com/@YallaDigitalAcademy"><FaYoutube /></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="row">
                                        <div className="col-lg-6 col-md col-sm-6 sub-two-right">
                                            <h6>Liens rapides</h6>
                                            <ul>
                                                <li><a href="/"><span className="fa fa-angle-double-right mr-2"></span>Acceuil</a></li>
                                                <li><a href="apropos"><span className="fa fa-angle-double-right mr-2"></span>À propos</a></li>
                                                <li><a href="createur"><span className="fa fa-angle-double-right mr-2"></span>Créateurs</a></li>
                                                <li><a href="contact"><span className="fa fa-angle-double-right mr-2"></span>Contact</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6 col-md col-sm-6 sub-one-left">
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

export default Detail;





