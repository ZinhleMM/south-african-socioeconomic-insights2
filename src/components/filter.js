function App() {
    // Filter state
    const [filters, setFilters] = React.useState({
      province: 'all',
      incomeRange: 'all',
      householdSize: 'all',
      geographicType: 'all',
      foodSecurity: 'all'
    });
  
    // Filter options
    const filterOptions = {
      province: [
        { value: 'all', label: 'All Provinces' },
        { value: 'gauteng', label: 'Gauteng' },
        { value: 'western-cape', label: 'Western Cape' },
        { value: 'kwazulu-natal', label: 'KwaZulu-Natal' },
        { value: 'eastern-cape', label: 'Eastern Cape' }
      ],
      incomeRange: [
        { value: 'all', label: 'All Income Ranges' },
        { value: 'low', label: 'Low Income (< R3000)' },
        { value: 'middle', label: 'Middle Income (R3000 - R15000)' },
        { value: 'high', label: 'High Income (> R15000)' }
      ],
      householdSize: [
        { value: 'all', label: 'All Sizes' },
        { value: 'small', label: '1-3 Members' },
        { value: 'medium', label: '4-6 Members' },
        { value: 'large', label: '7+ Members' }
      ],
      geographicType: [
        { value: 'all', label: 'All Types' },
        { value: 'urban', label: 'Urban Formal' },
        { value: 'traditional', label: 'Traditional Area' },
        { value: 'farm', label: 'Farm Area' }
      ],
      foodSecurity: [
        { value: 'all', label: 'All Levels' },
        { value: 'secure', label: 'Food Secure' },
        { value: 'mild', label: 'Mild Insecurity' },
        { value: 'moderate', label: 'Moderate Insecurity' },
        { value: 'severe', label: 'Severe Insecurity' }
      ]
    };
  
    // Handle filter changes
    const handleFilterChange = (filterType, value) => {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    };
  
    // Reset filters
    const resetFilters = () => {
      setFilters({
        province: 'all',
        incomeRange: 'all',
        householdSize: 'all',
        geographicType: 'all',
        foodSecurity: 'all'
      });
    };
  
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Data Filters</h2>
            <button 
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Reset Filters
            </button>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(filterOptions).map(([filterType, options]) => (
              <div key={filterType} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </label>
                <select
                  value={filters[filterType]}
                  onChange={(e) => handleFilterChange(filterType, e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
  
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Active Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => (
                value !== 'all' && (
                  <span 
                    key={key}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {key}: {value}
                  </span>
                )
              ))}
              {Object.values(filters).every(v => v === 'all') && (
                <span className="text-gray-500">No active filters</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }