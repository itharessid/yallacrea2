import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function UtilisateurDropDown({ isOpen, toggleDropdown }) {
  return (
    <div className="user-info-dropdown">
      <div className={`dropdown ${isOpen ? 'show' : ''}`}>
        <div className="dropdown-toggle" onClick={toggleDropdown} role="button">
          <span className="user-icon">
            <img src="src/assets/images/team2.jpg" alt=""/>
          </span>
          <span className="user-name">Wajdi Chabbane</span>
          <div className={`dropdown-menu dropdown-menu-right dropdown-menu-icon-list ${isOpen ? 'show' : ''}`}>
            <Link to="/login" className="dropdown-item"><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export default UtilisateurDropDown;
