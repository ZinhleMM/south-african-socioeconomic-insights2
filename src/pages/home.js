function App() {
    const [loading, setLoading] = React.useState(true);
    const [summaryStats, setSummaryStats] = React.useState({
      totalHouseholds: 0,
      averageIncome: 0,
      foodSecurityRate: 0,
      provinces: []
    });
  
    React.useEffect(() => {
      // Simulate data fetching
      setTimeout(() => {
        setSummaryStats({
          totalHouseholds: 20927,
          averageIncome: 8450,
          foodSecurityRate: 65,
          provinces: [
            { name: 'Western Cape', households: 1835 },
            { name: 'Eastern Cape', households: 2758 },
            { name: 'Northern Cape', households: 853 },
            { name: 'Free State', households: 1324 },
            { name: 'KwaZulu-Natal', households: 3386 },
            { name: 'North West', households: 1368 },
            { name: 'Gauteng', households: 5377 },
            { name: 'Mpumalanga', households: 1644 },
            { name: 'Limpopo', households: 2382 }
          ]
        });
        setLoading(false);
      }, 1000);
    }, []);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              General Household Survey 2023
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Explore insights from South African households
            </p>
          </div>
        </header>
  
        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="fas fa-home text-blue-500 text-2xl"></i>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Households
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {summaryStats.totalHouseholds.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="fas fa-coins text-green-500 text-2xl"></i>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Average Monthly Income
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        R {summaryStats.averageIncome.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <i className="fas fa-utensils text-purple-500 text-2xl"></i>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Food Security Rate
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {summaryStats.foodSecurityRate}%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Provincial Distribution */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Households by Province
              </h3>
              <div className="h-64">
                <Recharts.BarChart
                  width={800}
                  height={250}
                  data={summaryStats.provinces}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <Recharts.CartesianGrid strokeDasharray="3 3" />
                  <Recharts.XAxis dataKey="name" />
                  <Recharts.YAxis />
                  <Recharts.Tooltip />
                  <Recharts.Bar dataKey="households" fill="#4F46E5" />
                </Recharts.BarChart>
              </div>
            </div>
          </div>
  
          {/* Quick Links */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Explore Data
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Dive deep into household statistics with interactive visualizations
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  View Charts
                </button>
              </div>
            </div>
  
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Geographic Insights
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Explore household data across different provinces
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  View Maps
                </button>
              </div>
            </div>
  
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  About the Survey
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Learn more about the General Household Survey 2023
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }