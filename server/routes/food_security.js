// Constants for food security status
const FOOD_SECURITY_STATUS = {
    SECURE: 'Food Secure',
    MILD_INSECURITY: 'Mild Food Insecurity',
    MODERATE_INSECURITY: 'Moderate Food Insecurity',
    SEVERE_INSECURITY: 'Severe Food Insecurity'
};

// Food security indicator fields from GHS 2023
const FOOD_SECURITY_INDICATORS = {
    FEW_FOODS: 'fsd_fewfoods',      // Limited food variety
    SKIPPED_MEALS: 'fsd_skipped',    // Had to skip meals
    RAN_OUT: 'fsd_ranout',          // Ran out of food
    HUNGRY: 'fsd_hungry'            // Went hungry
};

// Process food security data for a household
function calculateFoodSecurityStatus(household) {
    let insecurityScore = 0;
    
    // Calculate insecurity score based on indicators
    if (household[FOOD_SECURITY_INDICATORS.FEW_FOODS] === 1) insecurityScore++;
    if (household[FOOD_SECURITY_INDICATORS.SKIPPED_MEALS] === 1) insecurityScore += 2;
    if (household[FOOD_SECURITY_INDICATORS.RAN_OUT] === 1) insecurityScore += 2;
    if (household[FOOD_SECURITY_INDICATORS.HUNGRY] === 1) insecurityScore += 3;

    // Determine food security status based on score
    if (insecurityScore === 0) {
        return FOOD_SECURITY_STATUS.SECURE;
    } else if (insecurityScore <= 2) {
        return FOOD_SECURITY_STATUS.MILD_INSECURITY;
    } else if (insecurityScore <= 5) {
        return FOOD_SECURITY_STATUS.MODERATE_INSECURITY;
    } else {
        return FOOD_SECURITY_STATUS.SEVERE_INSECURITY;
    }
}

// Calculate food security statistics for a dataset
function calculateFoodSecurityStats(households) {
    const stats = {
        totalHouseholds: households.length,
        foodSecure: 0,
        mildInsecurity: 0,
        moderateInsecurity: 0,
        severeInsecurity: 0,
        byProvince: {},
        byGeotype: {}
    };

    households.forEach(household => {
        const status = calculateFoodSecurityStatus(household);
        
        // Update overall counts
        switch(status) {
            case FOOD_SECURITY_STATUS.SECURE:
                stats.foodSecure++;
                break;
            case FOOD_SECURITY_STATUS.MILD_INSECURITY:
                stats.mildInsecurity++;
                break;
            case FOOD_SECURITY_STATUS.MODERATE_INSECURITY:
                stats.moderateInsecurity++;
                break;
            case FOOD_SECURITY_STATUS.SEVERE_INSECURITY:
                stats.severeInsecurity++;
                break;
        }

        // Update provincial stats
        const province = household.prov;
        if (!stats.byProvince[province]) {
            stats.byProvince[province] = {
                secure: 0,
                mild: 0,
                moderate: 0,
                severe: 0
            };
        }
        updateProvincialStats(stats.byProvince[province], status);

        // Update geotype stats
        const geotype = household.geotype;
        if (!stats.byGeotype[geotype]) {
            stats.byGeotype[geotype] = {
                secure: 0,
                mild: 0,
                moderate: 0,
                severe: 0
            };
        }
        updateGeotypeStats(stats.byGeotype[geotype], status);
    });

    return stats;
}

// Helper function to update provincial statistics
function updateProvincialStats(provinceStats, status) {
    switch(status) {
        case FOOD_SECURITY_STATUS.SECURE:
            provinceStats.secure++;
            break;
        case FOOD_SECURITY_STATUS.MILD_INSECURITY:
            provinceStats.mild++;
            break;
        case FOOD_SECURITY_STATUS.MODERATE_INSECURITY:
            provinceStats.moderate++;
            break;
        case FOOD_SECURITY_STATUS.SEVERE_INSECURITY:
            provinceStats.severe++;
            break;
    }
}

// Helper function to update geotype statistics
function updateGeotypeStats(geotypeStats, status) {
    switch(status) {
        case FOOD_SECURITY_STATUS.SECURE:
            geotypeStats.secure++;
            break;
        case FOOD_SECURITY_STATUS.MILD_INSECURITY:
            geotypeStats.mild++;
            break;
        case FOOD_SECURITY_STATUS.MODERATE_INSECURITY:
            geotypeStats.moderate++;
            break;
        case FOOD_SECURITY_STATUS.SEVERE_INSECURITY:
            geotypeStats.severe++;
            break;
    }
}

// Export functions and constants
export {
    FOOD_SECURITY_STATUS,
    FOOD_SECURITY_INDICATORS,
    calculateFoodSecurityStatus,
    calculateFoodSecurityStats
};