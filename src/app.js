function App() {
    // State for map data and filters
    const [selectedProvince, setSelectedProvince] = React.useState('all');
    const [selectedMetric, setSelectedMetric] = React.useState('foodSecurity');
    const [mapData, setMapData] = React.useState({
      foodSecurity: {
        'Western Cape': 75,
        'Eastern Cape': 65,
        'Northern Cape': 70,
        'Free State': 68,
        'KwaZulu-Natal': 72,
        'North West': 67,
        'Gauteng': 78,
        'Mpumalanga': 69,
        'Limpopo': 66
      }
    });
  
    // Metrics options
    const metrics = [
      { value: 'foodSecurity', label: 'Food Security' },
      { value: 'income', label: 'Average Income' },
      { value: 'householdSize', label: 'Household Size' },
      { value: 'assetOwnership', label: 'Asset Ownership' }
    ];
  
    // Provinces data
    const provinces = [
      { value: 'all', label: 'All Provinces' },
      { value: 'western-cape', label: 'Western Cape' },
      { value: 'eastern-cape', label: 'Eastern Cape' },
      { value: 'northern-cape', label: 'Northern Cape' },
      { value: 'free-state', label: 'Free State' },
      { value: 'kwazulu-natal', label: 'KwaZulu-Natal' },
      { value: 'north-west', label: 'North West' },
      { value: 'gauteng', label: 'Gauteng' },
      { value: 'mpumalanga', label: 'Mpumalanga' },
      { value: 'limpopo', label: 'Limpopo' }
    ];
  
    // Initialize map when component mounts
    React.useEffect(() => {
      // Initialize map centered on South Africa
      const map = L.map('map').setView([-30.5595, 22.9375], 5);
  
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
  
      // Cleanup on unmount
      return () => {
        map.remove();
      };
    }, []);
  
    return (
      <div className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Metric
            </label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {metrics.map(metric => (
                <option key={metric.value} value={metric.value}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>
  
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Province
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {provinces.map(province => (
                <option key={province.value} value={province.value}>
                  {province.label}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div id="map" className="h-[600px] rounded-lg shadow-lg"></div>
          </div>
  
          <div className="col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Provincial Statistics</h3>
              <div className="space-y-4">
                {Object.entries(mapData.foodSecurity)
                  .filter(([province]) => 
                    selectedProvince === 'all' || 
                    province.toLowerCase().replace(' ', '-') === selectedProvince
                  )
                  .map(([province, value]) => (
                    <div key={province} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{province}</span>
                      <span className="font-medium">{value}%</span>
                    </div>
                  ))
                }
              </div>
            </div>
  
            <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm">High (75-100%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                  <span className="text-sm">Medium (50-74%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span className="text-sm">Low (0-49%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }