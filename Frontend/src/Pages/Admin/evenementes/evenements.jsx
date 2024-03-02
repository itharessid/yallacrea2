import React from 'react';
import { Link } from 'react-router-dom';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './evenements.css';

function Evenements() {
  return (
    <>
      <Adminsidbar />
      <div className="main-container">
        <div className="row">
          <div className="cardP">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <image href="/src/assets/images/bureau.jpg" width="24" height="24" />
            </svg>
            <div className="cardP__content">
              <p className="cardP__title">Project Name</p>
              <p className="cardP__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
              <button className="cardP__button">
                <Link to="https://www.facebook.com/photo/?fbid=242417278943734&set=pcb.242417452277050">Photo</Link>
              </button>
              <button className="cardP__button secondary">
                <Link to="https://www.facebook.com/photo/?fbid=242417278943734&set=pcb.242417452277050">Vidéo</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Evenements;
