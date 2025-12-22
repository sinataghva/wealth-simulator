/**
 * Investment calculation logic
 * Pure functions for calculating investment growth
 */

/**
 * Calculate investment growth over time
 * @param {number} initialInvestment - Starting amount
 * @param {number} monthlyContribution - Monthly contribution amount
 * @param {number} annualReturn - Annual return percentage (e.g., 7 for 7%)
 * @param {number} durationYears - Investment duration in years
 * @returns {Object} Calculation results with timeline data
 */
export function calculateInvestmentGrowth(initialInvestment, monthlyContribution, annualReturn, durationYears) {
    const monthlyReturn = annualReturn / 100 / 12;
    const totalMonths = durationYears * 12;
    
    let balance = initialInvestment;
    const timeline = [];
    
    // Add initial state
    timeline.push({
        month: 0,
        year: 0,
        balance: initialInvestment,
        contributions: initialInvestment,
        gains: 0
    });
    
    // Calculate month by month
    for (let month = 1; month <= totalMonths; month++) {
        // Add monthly contribution at the start of the month
        balance += monthlyContribution;
        
        // Apply monthly return to the balance (after contribution)
        balance = balance * (1 + monthlyReturn);
        
        // Calculate totals for this point
        const contributions = initialInvestment + (monthlyContribution * month);
        const gains = balance - contributions;
        
        // Record yearly data points
        if (month % 12 === 0 || month === totalMonths) {
            timeline.push({
                month,
                year: month / 12,
                balance: Math.round(balance * 100) / 100,
                contributions: Math.round(contributions * 100) / 100,
                gains: Math.round(gains * 100) / 100
            });
        }
    }
    
    const finalBalance = timeline[timeline.length - 1].balance;
    const totalContributions = initialInvestment + (monthlyContribution * totalMonths);
    const totalGains = finalBalance - totalContributions;
    
    return {
        finalBalance,
        totalContributions,
        totalGains,
        timeline
    };
}

/**
 * Initialize calculator module
 * @param {Object} state - Application state
 */
export function initializeCalculator(state) {
    // Calculator initialization if needed
    return {
        calculate: (initial, monthly, returnRate, years) => 
            calculateInvestmentGrowth(initial, monthly, returnRate, years)
    };
}

