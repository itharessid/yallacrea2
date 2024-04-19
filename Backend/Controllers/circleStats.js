import React from 'react';
import './CircleStats.css' ; // Importez votre fichier CSS pour les styles personnalisés

const CircleStats = ({ title, count, image }) => {
  return (
    <div className="circle-stats">
      <div className="circle-content">
        <div className="widget-data">
          <div className="weight-600 font-14 text-center text-nowrap">{title}</div>
          <div className="h6 mb-0 text-center">{count}</div>
        </div>
        <img src={image} alt={title} className="mt-3" />
      </div>
    </div>
  );
};

export default CircleStats;
