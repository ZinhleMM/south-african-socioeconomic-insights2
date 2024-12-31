// Database configuration and connection handling
const mysql = require('mysql2/promise');
require('dotenv').config();

// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'ghs2023_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};``

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        connection.release();
        return true;
    } catch (error) {
        console.error('Error connecting to database:', error);
        return false;
    }
}

// Query execution with error handling
async function executeQuery(query, params = []) {
    try {
        const [results] = await pool.execute(query, params);
        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

// Common database queries
const queries = {
    // Household queries
    getHouseholdsByProvince: async (province) => {
        const query = `
            SELECT * FROM households 
            WHERE province = ?
            ORDER BY household_id`;
        return executeQuery(query, [province]);
    },

    // Food security queries
    getFoodSecurityStats: async () => {
        const query = `
            SELECT 
                province,
                COUNT(*) as total_households,
                SUM(CASE WHEN food_security_status = 'Food Secure' THEN 1 ELSE 0 END) as secure_count,
                SUM(CASE WHEN food_security_status = 'Mild Food Insecurity' THEN 1 ELSE 0 END) as mild_insecurity,
                SUM(CASE WHEN food_security_status = 'Moderate Food Insecurity' THEN 1 ELSE 0 END) as moderate_insecurity,
                SUM(CASE WHEN food_security_status = 'Severe Food Insecurity' THEN 1 ELSE 0 END) as severe_insecurity
            FROM households
            GROUP BY province`;
        return executeQuery(query);
    },

    // Income distribution queries
    getIncomeDistribution: async () => {
        const query = `
            SELECT 
                CASE 
                    WHEN monthly_income < 3000 THEN 'Low Income'
                    WHEN monthly_income < 15000 THEN 'Middle Income'
                    ELSE 'High Income'
                END as income_category,
                COUNT(*) as household_count
            FROM households
            GROUP BY income_category`;
        return executeQuery(query);
    },

    // Household size analysis
    getAverageHouseholdSize: async () => {
        const query = `
            SELECT 
                province,
                AVG(household_size) as avg_size,
                MIN(household_size) as min_size,
                MAX(household_size) as max_size
            FROM households
            GROUP BY province`;
        return executeQuery(query);
    },

    // Geographic distribution
    getGeographicDistribution: async () => {
        const query = `
            SELECT 
                geographic_type,
                COUNT(*) as count,
                AVG(monthly_income) as avg_income
            FROM households
            GROUP BY geographic_type`;
        return executeQuery(query);
    }
};

// Export database functions and connection pool
module.exports = {
    pool,
    testConnection,
    executeQuery,
    queries
};