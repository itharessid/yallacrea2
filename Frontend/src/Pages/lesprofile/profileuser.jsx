import React, { useState } from 'react';
import Gprofile from './gprofile.jsx';
import ImageUpload from './ImageUpload.jsx'; // Importez le composant ImageUpload
import axios from 'axios';

function profileuser() {
  return (
    <>
      <Gprofile/>
      <div className="inner-banner">
      <ImageUpload />
        <section className="w3l-breadcrumb">
        
            
          <div className="container">
          
             
         

          
            <div className="row justify-content-center">

            
              <div className="col-lg-10 col-12">
           
                <div className="row">
                    
                

                  {/* Colonne pour le composant ImageUpload */}
                  <div className="col-lg-3 col-12">
                    
                    
                  </div>
                  {/* Colonne pour la section w3l-breadcrumb */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default profileuser;
