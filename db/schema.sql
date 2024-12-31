-- Enable strict SQL mode for better error handling and data integrity
SET SQL_MODE = "STRICT_ALL_TABLES";

-- Create database with UTF-8 character set for proper text handling
CREATE DATABASE IF NOT EXISTS ghs2023_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE ghs2023_db;

-- Geography table: Contains location and service access information
CREATE TABLE IF NOT EXISTS Geography (
    prov INT PRIMARY KEY COMMENT 'Province code (1-9)',
    province_name VARCHAR(50) NOT NULL COMMENT 'Province name',
    geo_type VARCHAR(50) COMMENT 'Geographic type',
    wat_drinkwat TINYINT(1) COMMENT 'Access to safe drinking water',
    wat_dist TINYINT(1) COMMENT 'Water source within RDP standard distance',
    san_toil TINYINT(1) COMMENT 'Access to adequate sanitation',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Geographic and service access information';

-- Household table: Primary entity storing household-level information
CREATE TABLE IF NOT EXISTS Household (
    uqnr BIGINT PRIMARY KEY COMMENT 'Unique household identifier (from GHS)',
    prov INT NOT NULL COMMENT 'Province code (1-9)',
    geo_type VARCHAR(50) COMMENT 'Geographic type (Urban/Rural/Farm)',
    hholdsz INT COMMENT 'Number of people in household',
    totmhinc DECIMAL(12,2) COMMENT 'Total monthly household income in Rand',
    fin_exp DECIMAL(12,2) COMMENT 'Monthly food expenditure in Rand',
    agr_agr TINYINT(1) COMMENT 'Household engaged in agriculture (1=Yes, 0=No)',
    com_int_fixed TINYINT(1) COMMENT 'Has fixed internet connection (1=Yes, 0=No)',
    hsg_maind VARCHAR(50) COMMENT 'Main dwelling type',
    head_popgrp VARCHAR(50) COMMENT 'Population group of household head',
    head_sex VARCHAR(10) COMMENT 'Sex of household head',
    head_age INT COMMENT 'Age of household head',
    tra_taxi_cost DECIMAL(10,2) COMMENT 'Monthly taxi transport costs',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (prov) REFERENCES Geography(prov)
) ENGINE=InnoDB COMMENT='Main household information from GHS 2023';

-- FoodSecurity table: Tracks household food security indicators
CREATE TABLE IF NOT EXISTS FoodSecurity (
    uqnr BIGINT PRIMARY KEY COMMENT 'Unique household identifier',
    fsd_foodvariety INT COMMENT 'Food variety score (1-10)',
    fsd_hungry INT COMMENT 'Days hungry in past 30 days',
    fsd_skipped INT COMMENT 'Days meals skipped in past 30 days',
    fsd_ranout TINYINT(1) COMMENT 'Ran out of food in past 30 days',
    hwl_happy TINYINT(1) COMMENT 'Satisfaction with food security',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (uqnr) REFERENCES Household(uqnr)
) ENGINE=InnoDB COMMENT='Household food security metrics';

-- Assets table: Tracks household asset ownership
CREATE TABLE IF NOT EXISTS Assets (
    asset_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique asset record identifier',
    uqnr BIGINT COMMENT 'Unique household identifier',
    hwl_assets_microw TINYINT(1) COMMENT 'Owns microwave',
    mobphon_hh TINYINT(1) COMMENT 'Owns mobile phone',
    hwl_vehicle TINYINT(1) COMMENT 'Owns vehicle',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (uqnr) REFERENCES Household(uqnr)
) ENGINE=InnoDB COMMENT='Household asset ownership information';

-- Create indexes for frequently queried columns
CREATE INDEX idx_household_income ON Household(totmhinc);
CREATE INDEX idx_household_province ON Household(prov);
CREATE INDEX idx_food_security_hunger ON FoodSecurity(fsd_hungry);

-- Grant minimum necessary permissions
GRANT SELECT, INSERT, UPDATE ON ghs2023_db.* TO 'app_user'@'localhost';`