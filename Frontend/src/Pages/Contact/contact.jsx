import React, { useRef, useState }from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';
import { Dropdown } from 'react-bootstrap';

function Contact() {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_x6g4x0l', 'template_nikt6aq', form.current, {
        publicKey: 'Kfswj097MtScxgmJh',
      })
      .then(
        () => {
          console.log('Message envoyé avec succes!');
          setMessageSent(true); // Mettre à jour l'état pour afficher le message de confirmation
        },
        (error) => {
          console.log('Error', error.text);
        },
      );}
  return (
    <div>
      <header id="site-header" className="fixed-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg stroke">
            <h1>
              <a className="navbar-brand" href="index.html">
                <img
                  className="img-fluid"
                  src="src/assets/images/yallalogo.png"
                  alt="Logo"
                  style={{ maxWidth: '100px' }}
                />
              </a>
            </h1>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-lg-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Accueil <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="apropos">À propos</a>
                </li>
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle id="navbarDropdown">
                      Formation
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/accelerer">Cours Accéléré</Dropdown.Item>
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
                  <a href="preInscri" className="btn button-style" title="search">S'inscrire</a>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <section className="w3l-breadcrumb">
        <div className="container">
          <h4 className="inner-text-title font-weight-bold mb-sm-3 mb-2">Contact </h4>
          <ul className="breadcrumbs-custom-path">
            <li><a href="/">Accueil</a></li>
            <li className="active"><span className="fa fa-chevron-right mx-2" aria-hidden="true"></span> Contact </li>
          </ul>
        </div>
      </section>

      <section className="contact py-5" id="contact">
        <div className="container py-md-4 py-3">
          <div className="main-grid-contact">
            <div className="row mt-5 mx-0">
              <div className="col-lg-6 map mt-lg-0 mt-3">
                <iframe
                  title="Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6380.985941731756!2d10.1925479!3d36.9024761!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2cb004b721297%3A0x5c7f3066db4365cf!2sYalla%20Digital%20Academy!5e0!3m2!1sfr!2stn!4v1708950730525!5m2!1sfr!2stn"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="col-lg-6 content-form-right p-0">
                <div className="form-w3ls p-md-5 p-4">
                  <h4 className="mb-4 sec-title-w3">Envoyez-nous un message</h4>
                  <form ref={form} onSubmit={sendEmail} >
                    <div className="row"><hr/>
                    <label style={{ color: 'black'}}>Nom</label><hr/>
                     <input type="text" name="nom" required/><hr/>
                     <label style={{ color: 'black'}}>Prenom</label><hr/>
                      <input type="text" name="prenom" required/><hr/>
                      <label style={{ color: 'black'}}>Email</label>                  
                       <input type="email" name="email" required />
                      <label style={{ color: 'black'}}>Numéro de téléphone</label>
                      <input type="num" name="tel" id="tel" pattern="[0-9]*" required/>   
                      <label style={{ color: 'black'}}>Message</label>
                      <textarea name="message" id="message"required/>
                    </div>
                    <div className="input-group1 text-right">
                      <button className="btn button-style" type="submit">
                        Envoyer
                        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                      </button>
                    </div>
                    {messageSent && (
                      <div className="alert alert-success mt-3" role="alert">
                        Votre message a bien été envoyé! Un agent administratif va vous contacter prochainement. Merci.
                      </div>
                    )}
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
  );
}

export default Contact;
