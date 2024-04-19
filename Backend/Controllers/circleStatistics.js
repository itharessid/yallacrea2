import React from 'react';
import CircleStats from './CircleStats'; // Importez le composant CircleStats
import './CircleStats.css'; // Importez votre fichier CSS pour les styles personnalisés

const CircleStatistics = ({ stats }) => {
  return (
    <div className="circle-statistics">
      {stats.map((stat, index) => (
        <CircleStats key={index} title={stat.title} count={stat.count} image={stat.image} />
      ))}
    </div>
  );
};

export default CircleStatistics;
