/**
 * Main application entry point
 * Initializes the wealth simulator app
 */

import { calculateInvestmentGrowth } from './calculator.js';
import { initializeChart, updateChart } from './chart.js';
import { initializeUI, updateSummary } from './ui.js';

// Application state
const appState = {
    initialInvestment: 10000,
    monthlyContribution: 500,
    durationYears: 20,
    annualReturn: 7,
    currency: 'EUR' // Currency is configurable in code, not in UI
};

// Initialize application
function init() {
    // Initialize UI components with state update callback (creates layout)
    initializeUI(appState, handleStateUpdate);
    
    // Initialize chart after layout is created
    initializeChart();
    
    // Perform initial calculation
    calculateAndUpdate();
}

/**
 * Handle state updates from UI
 * @param {string} key - State key to update
 * @param {number} value - New value
 */
function handleStateUpdate(key, value) {
    appState[key] = value;
    calculateAndUpdate();
}

// Calculate and update all UI elements
function calculateAndUpdate() {
    // Perform calculation
    const results = calculateInvestmentGrowth(
        appState.initialInvestment,
        appState.monthlyContribution,
        appState.annualReturn,
        appState.durationYears
    );
    
    // Update summary display
    updateSummary(results, appState.currency);
    
    // Update chart
    updateChart(results.timeline, appState.currency);
}

// Export app state for other modules
export { appState, calculateAndUpdate };

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);

