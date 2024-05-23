import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const customStyles = {
  notificationList: {
    maxHeight: '145px', // Réduire la hauteur maximale
    overflowY: 'auto',
  },
  notificationText: {
    color: 'black', // Définir la couleur du texte en noir
  },
};

function NotificationDropDown({ isOpen, toggleDropdown }) {
  const [pEtudCount, setPEtudCount] = useState(0);
  const [pCreaCount, setPCreaCount] = useState(0);
  const [nPre, setNPre] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const preEtudResult = await axios.get("http://localhost:3001/preinscriEtudiant");
      setPEtudCount(preEtudResult.data.length);

      const preCreaResult = await axios.get("http://localhost:3001/preinscriCrea");
      setPCreaCount(preCreaResult.data.length);

      setNPre(preEtudResult.data.concat(preCreaResult.data));
    } catch (err) {
      console.log("Quelque chose s'est mal passé lors de la récupération des données :", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.dropdown')) {
        toggleDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, toggleDropdown]);

  return (
    <div className="user-notification">
      <div className={`dropdown ${isOpen ? 'show' : ''}`}>
        <a className="dropdown-toggle no-arrow" href="#" role="button" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faBell} />
          {nPre.length > 0 && (
            <span className="notification-ball">{nPre.length}</span>
          )}
        </a>
        <div className={`dropdown-menu dropdown-menu-right ${isOpen ? 'show' : ''}`}>
          <div className="notification-list customscroll" style={customStyles.notificationList}>
            {nPre.length > 0 ? (
              <>
                <Link to="/preInscriptionEtud">
                  <p style={customStyles.notificationText}>Vous avez <strong>{pEtudCount}</strong> nouvelles préinscriptions des étudiants à valider.</p>
                </Link>
                <Link to="/preInscriptionCrea">
                  <p style={customStyles.notificationText}>Vous avez <strong>{pCreaCount}</strong> nouvelles préinscriptions des créateurs à valider.</p>
                </Link>
              </>
            ) : (
              <p style={customStyles.notificationText}>Aucune nouvelle préinscription.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationDropDown;
