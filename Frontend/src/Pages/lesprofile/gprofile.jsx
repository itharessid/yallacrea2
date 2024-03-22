import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faUserCircle, faBook, faBuilding, faCalendarAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './gprofile.css'


function gprofile() {

  return (
    <div>
    

       <div className="header">
        <div className="header-right">
          <div className="dashboard-setting user-notification">
          </div>
        </div>
      </div>
      

        
        <div className="left-side-bar">
        <div className="brand-logo">
          <Link to="/sidbar">
          <br/>
            <img src="src/assets/images/yallalogo.png" alt="" className="yalla" />
          </Link>
          <div className="close-sidebar" data-toggle="left-sidebar-close">
            <i className="ion-close-round"></i>
          </div>
        </div>
        <div className="menu-block customscroll">
          <div className="sidebar-menu">
            <ul id="accordion-menu">
              <br/>
              <br/>
             
              <li className="dropdown">
                <Link to="/profiluser" className="dropdown-toggle">
                  <FontAwesomeIcon icon={faUserCircle} />{' '}
                  <span className="mtext"> Profile</span>
                </Link>
              </li>
              <br/>
              <br/>
              <li className="dropdown">
                <Link to="/video" className="dropdown-toggle">
                  <FontAwesomeIcon icon={faPlayCircle} />{' '}
                  <span className="mtext">vidéos</span>
                </Link>
              </li>
    
            </ul>
            <img src="src/assets/images/av.png" alt="Description de l'image" className="avcrea" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default gprofile
