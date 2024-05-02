import React, { useState } from 'react';
import './dataTables.bootstrap4.min.css';
import './responsive.bootstrap4.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPerson, faBook,faGlobe, faBuilding, faCalendarAlt,faHandshakeAlt,faUsers,faCheckCircle,faRunning, faTable,faUserPlus,faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './sidbar.css';
import { Link } from 'react-router-dom';

import UtilisateurDropDown from './UtilisateurDropDown';
import NotificationDropDown from './NotificationDropDown';

function Adminsidbar() {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [isStudentDropdownOpen,setStudentDropdownOpen]=useState(false);
  const [isCreatorDropdownOpen,setCreatorDropdownOpen]=useState(false);
  const [isCertifDropdownOpen,setCertifDropdownOpen]=useState(false);

  const toggleStudentDropdown = () => {
    setStudentDropdownOpen(!isStudentDropdownOpen);
  };

  const toggleCreatorDropdown = () => {
    setCreatorDropdownOpen(!isCreatorDropdownOpen);
  };
  const toggleCertifDropdown = () => {
    setCertifDropdownOpen(!isCertifDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
    if (isNotificationDropdownOpen) {
      setNotificationDropdownOpen(false);
    }
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!isNotificationDropdownOpen);
    if (isUserDropdownOpen) {
      setUserDropdownOpen(false);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="header-right">
          <div className="dashboard-setting user-notification">
          </div>
          <NotificationDropDown isOpen={isNotificationDropdownOpen} toggleDropdown={toggleNotificationDropdown} />
          <UtilisateurDropDown isOpen={isUserDropdownOpen} toggleDropdown={toggleUserDropdown} />
        </div>
      </div>
      <div className="left-side-bar">
      <div className="left-side-bar customscroll">
        <div className="brand-logo">
          <Link to="/bienvenue">
            <img src="src/assets/images/yallalogo.png" alt="" className="yalla" />
          </Link>
          <div className="close-sidebar" data-toggle="left-sidebar-close">
            <i className="ion-close-round"></i>
          </div>
        </div>
        <div className="menu-block customscroll">
          <div className="sidebar-menu">
            <ul id="accordion-menu">
              <li className="dropdown">
                <Link to="/bienvenue" className="dropdown-toggle">
                  <FontAwesomeIcon icon={faHome} />{' '}
                  <span className="mtext">Accueil</span>
                </Link>
              </li>
               <li className="dropdown">
                  <Link to="/etudiants" className="dropdown-toggle" onClick={toggleStudentDropdown}>
                    <FontAwesomeIcon icon={faPerson} />{' '}
                    <span className="mtext">Étudiants</span>
                    <FontAwesomeIcon icon={faChevronDown} className={`ml-auto ${isStudentDropdownOpen ? 'rotate-icon' : ''}`} />
                  </Link>
                  <ul className={`dropdown-menu ${isStudentDropdownOpen ? 'show' : ''}`}>
                    <li>
                      <Link to="/preInscriptionEtud" className="dropdown-toggle no-arrow">
                        <FontAwesomeIcon icon={faUserPlus} />{' '}
                        <span className="mtext">Pré-inscription des étudiants</span>
                      </Link>
                    </li>
                  </ul>
                  </li>
              <li className="dropdown">
                <Link to="/uploadE" className="dropdown-toggle">
                  <FontAwesomeIcon icon={faTable} />{' '}
                  <span className="mtext">Emplois du temps</span>
                </Link>
              </li>     
              <li className="dropdown">
                <Link to="/domaines" className="dropdown-toggle">
                  <FontAwesomeIcon icon={faGlobe} />{' '}
                  <span className="mtext">Domaines</span>
                </Link>
              </li>      
              <li className="dropdown">
                  <Link to="/createures" className="dropdown-toggle" onClick={toggleCreatorDropdown}>
                    <FontAwesomeIcon icon={faBook} />{' '}
                    <span className="mtext">Créateurs</span>
                    <FontAwesomeIcon icon={faChevronDown} className={`ml-auto ${isCreatorDropdownOpen ? 'rotate-icon' : ''}`} />
                  </Link>
                  <ul className={`dropdown-menu ${isCreatorDropdownOpen ? 'show' : ''}`}>
                    <li>
                      <Link to="/preInscriptionCrea" className="dropdown-toggle no-arrow">
                        <FontAwesomeIcon icon={faUserPlus} />{' '}
                        <span className="mtext">Pré-inscription des créateurs</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              <li className="dropdown">
                <Link to="/evenements" className="dropdown-toggle">
                  <FontAwesomeIcon icon={faBuilding} />{' '}
                  <span className="mtext">Évènements</span>
                </Link>
              </li>
              <li>
                <Link to="/calendrier" className="dropdown-toggle no-arrow">
                  <FontAwesomeIcon icon={faCalendarAlt} />{' '}
                  <span className="mtext">Calendrier</span>
                </Link>
              </li>
              <li>
                <Link to="/expert" className="dropdown-toggle no-arrow">
                  <FontAwesomeIcon icon={faHandshakeAlt} />{' '}
                  <span className="mtext"> Experts</span>
                </Link>
              </li>
              <li>
                <Link to="/partenaire" className="dropdown-toggle no-arrow">
                  <FontAwesomeIcon icon={faUsers} />{' '}
                  <span className="mtext">Partenaires</span>
                </Link>
              </li>
              <li>
                <Link to="/certif" className="dropdown-toggle no-arrow">
                  <FontAwesomeIcon icon={faCheckCircle} />{' '}
                  <span className="mtext">Certifications</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Adminsidbar;
