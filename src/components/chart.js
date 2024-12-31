function App() {
    // Sample data structure
    const [chartData, setChartData] = React.useState({
      foodSecurity: {
        labels: ['Food Secure', 'Mild Insecurity', 'Moderate Insecurity', 'Severe Insecurity'],
        data: [45, 25, 20, 10]
      },
      incomeDistribution: {
        labels: ['Low Income', 'Middle Income', 'High Income'],
        data: [30, 50, 20]
      },
      householdSize: {
        labels: ['1-2', '3-4', '5-6', '7+'],
        data: [20, 35, 30, 15]
      }
    });
  
    const [selectedChart, setSelectedChart] = React.useState('foodSecurity');
    const [selectedProvince, setSelectedProvince] = React.useState('all');
  
    // Chart configuration
    const chartConfig = {
      foodSecurity: {
        type: 'pie',
        title: 'Food Security Distribution',
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0']
      },
      incomeDistribution: {
        type: 'bar',
        title: 'Income Distribution',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      },
      householdSize: {
        type: 'doughnut',
        title: 'Household Size Distribution',
        backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384', '#4BC0C0']
      }
    };
  
    // Render chart using Chart.js
    React.useEffect(() => {
      const ctx = document.getElementById('ghsChart');
      const currentConfig = chartConfig[selectedChart];
  
      if (ctx) {
        new Chart(ctx, {
          type: currentConfig.type,
          data: {
            labels: chartData[selectedChart].labels,
            datasets: [{
              data: chartData[selectedChart].data,
              backgroundColor: currentConfig.backgroundColor,
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: currentConfig.title
              }
            }
          }
        });
      }
  
      return () => {
        // Cleanup chart instance
        Chart.getChart('ghsChart')?.destroy();
      };
    }, [selectedChart, selectedProvince]);
  
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <select 
            className="p-2 border rounded"
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
          >
            <option value="foodSecurity">Food Security</option>
            <option value="incomeDistribution">Income Distribution</option>
            <option value="householdSize">Household Size</option>
          </select>
  
          <select 
            className="p-2 border rounded"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="all">All Provinces</option>
            <option value="gauteng">Gauteng</option>
            <option value="western-cape">Western Cape</option>
            <option value="kwazulu-natal">KwaZulu-Natal</option>
          </select>
        </div>
  
        <div className="bg-white p-4 rounded-lg shadow">
          <canvas id="ghsChart"></canvas>
        </div>
  
        <div className="mt-4 text-sm text-gray-600">
          Data source: General Household Survey 2023
        </div>
      </div>
    );
  }