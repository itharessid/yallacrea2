import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Assurez-vous d'importer axios pour effectuer des requêtes HTTP

const customStyles = {
  notificationList: {
    height: 'auto',
    width: 'auto'
  }
};

function NotificationDropDown({ isOpen, toggleDropdown }) {
  const [pEtudCount, setPEtudCount] = useState(0);
  const [pCreaCount, setPCreaCount] = useState(0);
  const [nPre, setNPre] = useState([]); // Initialiser nPre comme un tableau vide

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const preEtudResult = await axios.get("http://localhost:3001/preinscriEtudiant");
      setPEtudCount(preEtudResult.data.length);

      const preCreaResult = await axios.get("http://localhost:3001/preinscriCrea");
      setPCreaCount(preCreaResult.data.length);

      // Mettre à jour l'état de nPre avec les nouvelles pré-inscriptions
      setNPre(preEtudResult.data.concat(preCreaResult.data));
    } catch (err) {
      console.log("Quelque chose s'est mal passé lors de la récupération des données :", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.dropdown')) {
        toggleDropdown(); // Utilisez toggleDropdown de props pour fermer le dropdown
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
          {/* Remplacer la badge par une boule contenant nPre.length */}
          { nPre.length !== 0 && (
          <span className="notification-ball">{nPre.length}</span>
)}
        </a>
        <div className={`dropdown-menu dropdown-menu-right ${isOpen ? 'show' : ''}`}>
          <div className="notification-list mx-h-350 customscroll" style={customStyles.notificationList}>
            {/* Utilisez nPre.length pour afficher le nombre de nouvelles pré-inscriptions */}
            { nPre.length !== 0 && (
                <p>Vous avez {nPre.length} nouvelles préinscriptions à valider.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationDropDown;
