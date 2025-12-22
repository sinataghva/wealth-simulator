/**
 * UI updates and DOM manipulation
 * Handles all user interface interactions
 */

import { formatCurrency, formatNumber, formatPercentage, generateSummarySentence } from './utils.js';

// Callback function for state updates (set by main.js)
let onStateUpdate = null;

/**
 * Initialize UI components
 * @param {Object} state - Application state
 * @param {Function} stateUpdateCallback - Callback function to trigger recalculation
 */
export function initializeUI(state, stateUpdateCallback) {
    onStateUpdate = stateUpdateCallback;
    
    // Create main layout structure
    createLayout();
    
    // Set up input fields
    setupInputs(state);
    
    // Set up sliders
    setupSliders(state);
    
    // Initialize summary section
    initializeSummary();
}

/**
 * Create the main layout structure
 */
function createLayout() {
    const app = document.getElementById('app');
    if (!app) return;
    
    app.innerHTML = `
        <div class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Wealth Simulator</h1>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Left: Inputs -->
                <div class="space-y-6">
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Investment Parameters</h2>
                        <div id="inputs-container" class="space-y-6">
                            <!-- Inputs will be generated here -->
                        </div>
                    </div>
                </div>
                
                <!-- Right: Chart and Summary -->
                <div class="space-y-6">
                    <!-- Chart -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Portfolio Growth</h2>
                        <div class="relative h-60">
                            <canvas id="portfolioChart"></canvas>
                        </div>
                    </div>
                    
                    <!-- Summary -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Summary</h2>
                        <div id="summary-container">
                            <!-- Summary will be generated here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Set up input fields
 * @param {Object} state - Application state
 */
function setupInputs(state) {
    const container = document.getElementById('inputs-container');
    if (!container) return;
    
    // Input field configurations
    const inputs = [
        {
            id: 'initial-investment',
            label: 'Initial Investment',
            value: state.initialInvestment,
            min: 0,
            max: 1000000,
            step: 1000,
            format: (val) => formatCurrency(val, state.currency),
            unit: '€',
            stateKey: 'initialInvestment'
        },
        {
            id: 'monthly-contribution',
            label: 'Monthly Contribution',
            value: state.monthlyContribution,
            min: 0,
            max: 10000,
            step: 50,
            format: (val) => formatCurrency(val, state.currency),
            unit: '€',
            stateKey: 'monthlyContribution'
        },
        {
            id: 'duration-years',
            label: 'Investment Duration',
            value: state.durationYears,
            min: 1,
            max: 50,
            step: 1,
            format: (val) => `${formatNumber(val)} years`,
            unit: 'years',
            stateKey: 'durationYears'
        },
        {
            id: 'annual-return',
            label: 'Annual Return',
            value: state.annualReturn,
            min: 0,
            max: 20,
            step: 0.1,
            format: (val) => formatPercentage(val, 1),
            unit: '%',
            stateKey: 'annualReturn'
        }
    ];
    
    container.innerHTML = inputs.map(input => `
        <div class="space-y-2">
            <label for="${input.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ${input.label}
            </label>
            <div class="flex items-center gap-2">
                <input
                    type="number"
                    id="${input.id}"
                    class="flex-1 px-3 py-2 border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white text-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                    value="${input.value}"
                    min="${input.min}"
                    max="${input.max}"
                    step="${input.step}"
                />
                <span id="${input.id}-display" class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    ${input.unit || ''}
                </span>
            </div>
        </div>
    `).join('');
    
    // Set up event listeners for inputs
    inputs.forEach(input => {
        const inputEl = document.getElementById(input.id);
        
        // Update state on input change
        inputEl.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value) || 0;
            updateStateAndRecalculate(input.stateKey, value);
        });
    });
}

/**
 * Set up sliders (removed - no longer used)
 * @param {Object} state - Application state
 */
function setupSliders(state) {
    // Sliders have been removed per user request
}

/**
 * Initialize summary section
 */
function initializeSummary() {
    const container = document.getElementById('summary-container');
    if (!container) return;
    
    container.innerHTML = '<p class="text-gray-600 dark:text-gray-400">Enter values to see calculations</p>';
}

/**
 * Update summary display
 * @param {Object} results - Calculation results
 * @param {string} currency - Currency symbol
 */
export function updateSummary(results, currency = 'EUR') {
    const container = document.getElementById('summary-container');
    if (!container) return;
    
    const summarySentence = generateSummarySentence(results, currency);
    
    container.innerHTML = `
        <div class="space-y-4">
            <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Final Portfolio Value</p>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">${formatCurrency(results.finalBalance, currency)}</p>
            </div>
            <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Total Contributions</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">${formatCurrency(results.totalContributions, currency)}</p>
            </div>
            <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Total Gains</p>
                <p class="text-2xl font-semibold text-green-600 dark:text-green-400">${formatCurrency(results.totalGains, currency)}</p>
            </div>
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">${summarySentence}</p>
            </div>
        </div>
    `;
}

/**
 * Update state and trigger recalculation
 * @param {string} key - State key to update
 * @param {number} value - New value
 */
function updateStateAndRecalculate(key, value) {
    if (onStateUpdate) {
        onStateUpdate(key, value);
    }
}

