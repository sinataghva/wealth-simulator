/**
 * Utility functions
 * Currency formatting, number formatting, helpers
 */

/**
 * Format number as currency
 * @param amount - Amount to format
 * @param currency - Currency code (USD, EUR, etc.)
 * @param locale - Locale string (default: 'fr-FR' for French formatting)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'EUR',
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with French formatting (spaces for thousands, comma for decimals)
 * @param num - Number to format
 * @param locale - Locale string (default: 'fr-FR' for French formatting)
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string = 'fr-FR'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format percentage
 * @param value - Percentage value (e.g., 7 for 7%)
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Validate number input
 * @param value - Input value
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Parsed number or null if invalid
 */
export function validateNumber(
  value: string,
  min: number = 0,
  max: number = Infinity
): number | null {
  const num = parseFloat(value);
  if (isNaN(num) || num < min || num > max) {
    return null;
  }
  return num;
}

/**
 * Format date with French formatting
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  return new Intl.DateTimeFormat('fr-FR', defaultOptions).format(date);
}

/**
 * Generate summary sentence
 * @param results - Calculation results
 * @param currency - Currency symbol
 * @returns Summary sentence
 */
export function generateSummarySentence(
  results: { finalValue: number; totalContributions: number; totalGains: number },
  currency: string = 'EUR'
): string {
  const final = formatCurrency(results.finalValue, currency);
  const contributions = formatCurrency(results.totalContributions, currency);
  const gains = formatCurrency(results.totalGains, currency);
  
  return `Your investment will grow to ${final}, with ${contributions} in contributions and ${gains} in gains.`;
}

