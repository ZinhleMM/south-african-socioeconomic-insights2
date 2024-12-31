// Constants
const HOUSEHOLD_STATUS = {
    LOW_INCOME: 'low_income',
    MIDDLE_INCOME: 'middle_income',
    HIGH_INCOME: 'high_income'
};

const GEOGRAPHIC_TYPE = {
    URBAN_FORMAL: '1',
    TRADITIONAL: '2',
    FARMS: '3'
};

// Household class to manage household data
class Household {
    constructor(data) {
        this.id = data.uqnr;
        this.province = data.prov;
        this.headAge = data.head_age;
        this.headGender = data.head_sex === 1 ? 'Male' : 'Female';
        this.householdSize = data.hholdsz;
        this.monthlyIncome = data.totmhinc;
        this.geotype = data.geotype;
        this.foodSecurity = this.calculateFoodSecurity(data);
        this.assets = this.processAssets(data);
        this.grants = data.soc_grant_hh;
    }

    // Calculate food security status based on indicators
    calculateFoodSecurity(data) {
        let score = 0;
        if (data.fsd_fewfoods === 1) score++;
        if (data.fsd_skipped === 1) score += 2;
        if (data.fsd_ranout === 1) score += 2;
        if (data.fsd_hungry === 1) score += 3;

        return {
            score: score,
            status: this.getFoodSecurityStatus(score)
        };
    }

    getFoodSecurityStatus(score) {
        if (score === 0) return 'Food Secure';
        if (score <= 2) return 'Mildly Food Insecure';
        if (score <= 5) return 'Moderately Food Insecure';
        return 'Severely Food Insecure';
    }

    // Process household assets
    processAssets(data) {
        return {
            hasVehicle: data.hwl_vehicle === 1,
            hasMicrowave: data.hwl_assets_microw === 1,
            mobilePhones: data.mobphon_hh,
            hasDomesticWorker: data.hwl_domw === 1
        };
    }

    // Get income category
    getIncomeCategory() {
        if (this.monthlyIncome < 3000) return HOUSEHOLD_STATUS.LOW_INCOME;
        if (this.monthlyIncome < 15000) return HOUSEHOLD_STATUS.MIDDLE_INCOME;
        return HOUSEHOLD_STATUS.HIGH_INCOME;
    }

    // Check if household receives social grants
    hasGrants() {
        return this.grants > 0;
    }
}

// HouseholdAnalytics class for data analysis
class HouseholdAnalytics {
    constructor(households) {
        this.households = households;
    }

    // Calculate average household size by province
    getAverageHouseholdSizeByProvince() {
        const provinceGroups = this.groupByProvince();
        const averages = {};

        for (const [province, households] of Object.entries(provinceGroups)) {
            averages[province] = this.calculateAverage(
                households.map(h => h.householdSize)
            );
        }

        return averages;
    }

    // Calculate food security statistics
    getFoodSecurityStats() {
        const total = this.households.length;
        const stats = {
            secure: 0,
            mildInsecurity: 0,
            moderateInsecurity: 0,
            severeInsecurity: 0
        };

        this.households.forEach(household => {
            switch(household.foodSecurity.status) {
                case 'Food Secure':
                    stats.secure++;
                    break;
                case 'Mildly Food Insecure':
                    stats.mildInsecurity++;
                    break;
                case 'Moderately Food Insecure':
                    stats.moderateInsecurity++;
                    break;
                case 'Severely Food Insecure':
                    stats.severeInsecurity++;
                    break;
            }
        });

        // Convert to percentages
        return {
            secure: (stats.secure / total) * 100,
            mildInsecurity: (stats.mildInsecurity / total) * 100,
            moderateInsecurity: (stats.moderateInsecurity / total) * 100,
            severeInsecurity: (stats.severeInsecurity / total) * 100
        };
    }

    // Group households by province
    groupByProvince() {
        return this.households.reduce((groups, household) => {
            const province = household.province;
            if (!groups[province]) {
                groups[province] = [];
            }
            groups[province].push(household);
            return groups;
        }, {});
    }

    // Calculate income distribution
    getIncomeDistribution() {
        const distribution = {
            [HOUSEHOLD_STATUS.LOW_INCOME]: 0,
            [HOUSEHOLD_STATUS.MIDDLE_INCOME]: 0,
            [HOUSEHOLD_STATUS.HIGH_INCOME]: 0
        };

        this.households.forEach(household => {
            distribution[household.getIncomeCategory()]++;
        });

        return distribution;
    }

    // Calculate average
    calculateAverage(numbers) {
        return numbers.reduce((a, b) => a + b, 0) / numbers.length;
    }

    // Get grant statistics
    getGrantStats() {
        const totalHouseholds = this.households.length;
        const householdsWithGrants = this.households.filter(h => h.hasGrants()).length;

        return {
            percentageWithGrants: (householdsWithGrants / totalHouseholds) * 100,
            averageGrantsPerHousehold: this.calculateAverage(
                this.households.map(h => h.grants)
            )
        };
    }
}

// Export the classes and constants
export {
    Household,
    HouseholdAnalytics,
    HOUSEHOLD_STATUS,
    GEOGRAPHIC_TYPE
};