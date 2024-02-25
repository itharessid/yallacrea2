import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function NotificationDropDown({ isOpen, toggleDropdown }) {
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
          <span className="badge notification-active"></span>
        </a>
        <div className={`dropdown-menu dropdown-menu-right ${isOpen ? 'show' : ''}`}>
          <div className="notification-list mx-h-350 customscroll">
            <ul>
              <li>
                <a href="#">
                  <img src="vendors/images/img.jpg" alt=""/>
                  <h3>John Doe</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p>
                </a>
              </li>
              <li>
				<a href="#">
				    <img src="vendors/images/photo1.jpg" alt=""/>
					<h3>Lea R. Frith</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p>
				</a>
			   </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationDropDown;
