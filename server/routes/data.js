// Constants
const API_BASE_URL = '/api';
const CHART_COLORS = {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    neutral: '#95a5a6'
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Initialise Maps
    InitialiseMaps();

    // Initialise Charts
    InitialiseCharts();

    // Setup Filters
    setupFilters();
});

// Theme Management
function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Map Functions
function InitialiseMaps() {
    const map = document.getElementById('sa-map');
    if (!map) return;

    // Fetch and display province data
    fetch(`${API_BASE_URL}/provinces`)
        .then(response => response.json())
        .then(data => {
            displayProvinceData(data);
        })
        .catch(error => console.error('Error loading province data:', error));
}

function displayProvinceData(data) {
    // Update map visualization based on selected metric
    const metricSelect = document.getElementById('metric-select');
    const selectedMetric = metricSelect?.value || 'household_size';
    
    updateMapColors(data, selectedMetric);
    updateProvincialStats(data, selectedMetric);
}

// Chart Functions
function InitialiseCharts() {
    // Initialise household size distribution chart
    createHouseholdSizeChart();
    
    // Initialise income distribution chart
    createIncomeDistributionChart();
    
    // Initialise food security chart
    createFoodSecurityChart();
}

function createHouseholdSizeChart() {
    fetch(`${API_BASE_URL}/household-sizes`)
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('household-size-chart')?.getContext('2d');
            if (!ctx) return;

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Household Size Distribution',
                        data: data.values,
                        backgroundColor: CHART_COLORS.primary
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Household Size Distribution (2023)'
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error creating household size chart:', error));
}

// Filter Functions
function setupFilters() {
    const provinceSelect = document.getElementById('province-select');
    const metricSelect = document.getElementById('metric-select');

    if (provinceSelect) {
        provinceSelect.addEventListener('change', (e) => {
            updateDataByProvince(e.target.value);
        });
    }

    if (metricSelect) {
        metricSelect.addEventListener('change', (e) => {
            updateDataByMetric(e.target.value);
        });
    }
}

function updateDataByProvince(province) {
    fetch(`${API_BASE_URL}/data/${province}`)
        .then(response => response.json())
        .then(data => {
            updateCharts(data);
            updateStats(data);
        })
        .catch(error => console.error('Error updating province data:', error));
}

function updateDataByMetric(metric) {
    const currentProvince = document.getElementById('province-select')?.value || 'all';
    
    fetch(`${API_BASE_URL}/data/${currentProvince}/${metric}`)
        .then(response => response.json())
        .then(data => {
            updateVisualization(data, metric);
        })
        .catch(error => console.error('Error updating metric data:', error));
}

// Utility Functions
function updateVisualization(data, metric) {
    // Update both map and charts based on selected metric
    updateMapColors(data, metric);
    updateCharts(data);
    updateStats(data);
}

function updateStats(data) {
    const statsDiv = document.getElementById('provincial-stats');
    if (!statsDiv) return;

    statsDiv.innerHTML = `
        <h3>${data.provinceName || 'All Provinces'}</h3>
        <p>Average Household Size: ${data.avgHouseholdSize}</p>
        <p>Median Income: R${data.medianIncome}</p>
        <p>Food Security Index: ${data.foodSecurityIndex}%</p>
        <p>Total Households: ${data.totalHouseholds}</p>
    `;
}

// Error Handling
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // Implement user-friendly error messaging
}

// Initialise theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);