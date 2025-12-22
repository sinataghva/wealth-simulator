/**
 * Utility functions
 * Currency formatting, number formatting, helpers
 */

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (USD, EUR, etc.)
 * @param {string} locale - Locale string (default: 'fr-FR' for French formatting)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'EUR', locale = 'fr-FR') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format number with French formatting (spaces for thousands, comma for decimals)
 * @param {number} num - Number to format
 * @param {string} locale - Locale string (default: 'fr-FR' for French formatting)
 * @returns {string} Formatted number string
 */
export function formatNumber(num, locale = 'fr-FR') {
    return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format percentage
 * @param {number} value - Percentage value (e.g., 7 for 7%)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value, decimals = 1) {
    return `${value.toFixed(decimals)}%`;
}

/**
 * Validate number input
 * @param {string} value - Input value
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number|null} Parsed number or null if invalid
 */
export function validateNumber(value, min = 0, max = Infinity) {
    const num = parseFloat(value);
    if (isNaN(num) || num < min || num > max) {
        return null;
    }
    return num;
}

/**
 * Format date with French formatting
 * @param {Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    };
    return new Intl.DateTimeFormat('fr-FR', defaultOptions).format(date);
}

/**
 * Generate summary sentence
 * @param {Object} results - Calculation results
 * @param {string} currency - Currency symbol
 * @returns {string} Summary sentence
 */
export function generateSummarySentence(results, currency = 'EUR') {
    const final = formatCurrency(results.finalBalance, currency);
    const contributions = formatCurrency(results.totalContributions, currency);
    const gains = formatCurrency(results.totalGains, currency);
    
    return `Your investment will grow to ${final}, with ${contributions} in contributions and ${gains} in gains.`;
}

