import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

let myPieChart = null;

export function createPieChart(createursCount, etudiantsCount, domainesCount, expertCount, partenaireCount, pEtudCount, pCreaCount, eventsCount) {
  if (myPieChart) {
    myPieChart.destroy();
  }

  const data = [createursCount, etudiantsCount, domainesCount, expertCount, partenaireCount, pEtudCount, pCreaCount, eventsCount];
  const total = data.reduce((acc, value) => acc + value, 0);
  const percentages = data.map(value => ((value / total) * 100).toFixed(2));

  const ctx = document.getElementById("myPieChart");
  myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Createurs", "Etudiants", "Domaines", "Experts", "Partenaires", "Pre-inscriptions Etudiants", "Pre-inscriptions Createurs", "Evenements"],
      datasets: [{
        data: data,
        backgroundColor: ['purple', '#FF02BC', '#4F0041', '#9b59b6', '#702595', '#9966ff', '#C51B96', 'rgb(168, 118, 168)'],
        hoverBackgroundColor: ['purple', '#FF02BC', '#4F0041', '#9b59b6', '#702595', '#9966ff', '#C51B96', 'rgb(168, 118, 168)'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        datalabels: {
          formatter: (value, context) => {
            const percentage = ((value / total) * 100).toFixed(2);
            return `${percentage}%`;
          },
          color: '#fff',
          anchor: 'end',
          align: 'start',
          offset: -10,
          borderWidth: 2,
          borderColor: '#fff',
          borderRadius: 25,
          backgroundColor: (context) => {
            return context.dataset.backgroundColor;
          },
        }
      },
      cutout: '70%', // Augmentez cette valeur pour réduire le centre du cercle
      events: ['mousemove'],
      onHover: function(event, elements) {
        if (elements.length) {
          const index = elements[0].index;
          myPieChart.getDatasetMeta(0).data[index].options.hoverOffset = 8;
          myPieChart.update();
        } else {
          myPieChart.getDatasetMeta(0).data.forEach((slice) => {
            slice.options.hoverOffset = 0;
          });
          myPieChart.update();
        }
      }
    },
    plugins: [ChartDataLabels],
  });
}
