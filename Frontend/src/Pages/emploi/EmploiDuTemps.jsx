import React from 'react';
import { Dropdown } from 'react-bootstrap';

// Définir un composant pour un emploi du temps individuel
function EmploiDuTemps({ imageSrc, titre, description, pdfUrl }) {
  const handleDownload = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="col-lg-6 col-sm-6 mt-sm-0 mt-4">
      <div className="grids5-info">
        <a href="#blog" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img src={imageSrc} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </a>
        <div className="blog-info">
          <h5>Titre: {titre}</h5>
          <br/>
          <h4><a href="#blog">Lien vers le blog</a></h4>
          <p>Description: {description}</p>
          <button onClick={handleDownload}>Télécharger en PDF</button>
        </div>
      </div>
    </div>
  );
}

export default EmploiDuTemps;
