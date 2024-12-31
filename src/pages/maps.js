function App() {
    const [selectedProvince, setSelectedProvince] = React.useState('all');
    const [selectedMetric, setSelectedMetric] = React.useState('households');
    const [loading, setLoading] = React.useState(true);
    const [mapData, setMapData] = React.useState({
      households: {},
      foodSecurity: {},
      income: {}
    });
  
    // Simulated data for demonstration
    React.useEffect(() => {
      // In production, this would fetch from your API
      const mockData = {
        households: {
          'Western Cape': 2136493,
          'Eastern Cape': 1760977,
          'Northern Cape': 379837,
          'Free State': 999122,
          'KwaZulu-Natal': 3292373,
          'North West': 1389694,
          'Gauteng': 5779139,
          'Mpumalanga': 1492924,
          'Limpopo': 1774687
        },
        foodSecurity: {
          'Western Cape': 78,
          'Eastern Cape': 65,
          'Northern Cape': 70,
          'Free State': 68,
          'KwaZulu-Natal': 62,
          'North West': 64,
          'Gauteng': 75,
          'Mpumalanga': 66,
          'Limpopo': 63
        },
        income: {
          'Western Cape': 8450,
          'Eastern Cape': 5200,
          'Northern Cape': 6100,
          'Free State': 5800,
          'KwaZulu-Natal': 6200,
          'North West': 5900,
          'Gauteng': 9200,
          'Mpumalanga': 6300,
          'Limpopo': 5400
        }
      };
      setMapData(mockData);
      setLoading(false);
    }, []);
  
    if (loading) {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
  
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Geographic Distribution</h1>
          <p className="mt-2 text-gray-600">Explore household statistics across South African provinces</p>
        </div>
  
        {/* Controls */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Province</label>
            <select 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="all">All Provinces</option>
              <option value="WC">Western Cape</option>
              <option value="EC">Eastern Cape</option>
              <option value="NC">Northern Cape</option>
              <option value="FS">Free State</option>
              <option value="KZN">KwaZulu-Natal</option>
              <option value="NW">North West</option>
              <option value="GP">Gauteng</option>
              <option value="MP">Mpumalanga</option>
              <option value="LP">Limpopo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Metric</label>
            <select 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="households">Number of Households</option>
              <option value="foodSecurity">Food Security Rate (%)</option>
              <option value="income">Average Monthly Income (R)</option>
            </select>
          </div>
        </div>
  
        {/* Map and Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">South Africa Provinces</h2>
            <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
              {/* Placeholder for map - would use a mapping library like Leaflet in production */}
              <div className="text-gray-500">Interactive map would render here</div>
            </div>
          </div>
  
          {/* Provincial Statistics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Provincial Statistics</h2>
            <div className="space-y-4">
              {Object.entries(mapData[selectedMetric]).map(([province, value]) => (
                <div key={province} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{province}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedMetric === 'households' && value.toLocaleString()}
                    {selectedMetric === 'foodSecurity' && `${value}%`}
                    {selectedMetric === 'income' && `R ${value.toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Legend */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Legend</h3>
          <div className="grid grid-cols-5 gap-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-200 rounded mr-2"></div>
              <span className="text-xs">Lowest</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-300 rounded mr-2"></div>
              <span className="text-xs">Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
              <span className="text-xs">Highest</span>
            </div>
          </div>
        </div>
      </div>
    );
  }