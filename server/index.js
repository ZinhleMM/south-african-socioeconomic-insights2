// Import required modules
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'ghs2023_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

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

// API Routes

// Get household statistics by province
app.get('/api/households/province', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                province,
                COUNT(*) as total_households,
                AVG(household_size) as avg_household_size,
                AVG(monthly_income) as avg_income
            FROM households
            GROUP BY province
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Get food security statistics
app.get('/api/food-security', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                province,
                COUNT(*) as total_households,
                SUM(CASE WHEN fsd_fewfoods = 1 THEN 1 ELSE 0 END) as limited_food_variety,
                SUM(CASE WHEN fsd_skipped = 1 THEN 1 ELSE 0 END) as skipped_meals,
                SUM(CASE WHEN fsd_ranout = 1 THEN 1 ELSE 0 END) as ran_out_of_food,
                SUM(CASE WHEN fsd_hungry = 1 THEN 1 ELSE 0 END) as experienced_hunger
            FROM households
            GROUP BY province
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Get household income distribution
app.get('/api/income-distribution', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                CASE 
                    WHEN monthly_income < 3000 THEN 'Low Income'
                    WHEN monthly_income < 15000 THEN 'Middle Income'
                    ELSE 'High Income'
                END as income_category,
                COUNT(*) as household_count
            FROM households
            GROUP BY income_category
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Get geographic distribution
app.get('/api/geographic-distribution', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                geographic_type,
                COUNT(*) as count,
                AVG(monthly_income) as avg_income,
                AVG(household_size) as avg_household_size
            FROM households
            GROUP BY geographic_type
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Get asset ownership statistics
app.get('/api/asset-ownership', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                province,
                SUM(CASE WHEN hwl_vehicle = 1 THEN 1 ELSE 0 END) as owns_vehicle,
                SUM(CASE WHEN hwl_assets_microw = 1 THEN 1 ELSE 0 END) as owns_microwave,
                AVG(mobphon_hh) as avg_mobile_phones
            FROM households
            GROUP BY province
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Start server
app.listen(port, async () => {
    await testConnection();
    console.log(`Server running on port ${port}`);
});

module.exports = app;