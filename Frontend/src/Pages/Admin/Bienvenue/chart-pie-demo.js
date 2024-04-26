import Chart from 'chart.js/auto';

let myPieChart; // Déclarer une variable pour stocker l'instance du graphique

export function createPieChart(createursCount, etudiantsCount, domainesCount, expertCount, partenaireCount, pEtudCount, pCreaCount, eventsCount) {
  if (myPieChart) {
    // Si le graphique existe déjà, détruisez-le
    myPieChart.destroy();
  }

  var ctx = document.getElementById("myPieChart");
  myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Createurs", "Etudiants", "Domaines", "Experts", "Partenaires", "Pre-inscriptions Etudiants", "Pre-inscriptions Createurs", "Evenements"],
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
    },
  });
}
