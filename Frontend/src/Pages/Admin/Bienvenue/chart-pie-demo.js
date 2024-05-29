import Chart from 'chart.js/auto';


let myPieChart = null; // Initialisez à null pour vérifier s'il existe déjà un graphique

export function createPieChart(createursCount, etudiantsCount, domainesCount, expertCount, partenaireCount, pEtudCount, pCreaCount, eventsCount) {
  // Vérifier s'il existe déjà un graphique
  if (myPieChart) {
    // Si le graphique existe déjà, détruisez-le
    myPieChart.destroy();
  }
  const data = [createursCount, etudiantsCount, domainesCount, expertCount, partenaireCount, pEtudCount, pCreaCount, eventsCount];
  const total = data.reduce((acc, value) => acc + value, 0);
  const percentages = data.map(value => ((value / total) * 100).toFixed(2));


  var ctx = document.getElementById("myPieChart");
  myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Createurs", "Etudiants", "Domaines", "Experts", "Partenaires", "Pre-inscriptions Etudiants", "Pre-inscriptions Createurs", "Evenements"].map((label, index) => `${label}: ${percentages[index]}%`),
      datasets: [{
        data: [createursCount, etudiantsCount, domainesCount, expertCount, partenaireCount, pEtudCount, pCreaCount, eventsCount],
        backgroundColor: ['purple', '#FF02BC', '#4F0041', '#9b59b6', '#702595', '#9966ff', '#C51B96', 'rgb(168, 118, 168)'],
        hoverBackgroundColor: ['purple', '#FF02BC', '#4F0041', '#9b59b6', '#702595', '#9966ff', '#C51B96', 'rgb(168, 118, 168)'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      
      cutoutPercentage: 80,
      events: ['mousemove'], // Activer les événements de souris pour le graphique
      onHover: function(event, elements) {
        if (elements.length) {
          const index = elements[0].index;
          // Appliquer l'effet 3D uniquement à la tranche survolée
          myPieChart.getDatasetMeta(0).data[index].options.hoverOffset = 8;
          myPieChart.update(); // Mettre à jour le graphique pour refléter les modifications
        } else {
          // Si la souris ne survole pas une tranche, laisser toutes les tranches en 2D
          myPieChart.getDatasetMeta(0).data.forEach((slice) => {
            slice.options.hoverOffset = 0;
          });
          myPieChart.update(); // Mettre à jour le graphique pour refléter les modifications
        }
      }
      
    },
  });
}
