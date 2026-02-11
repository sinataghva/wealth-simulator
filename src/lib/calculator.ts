/**
 * Investment calculation logic
 * Pure functions for calculating investment growth
 */

export interface ChartDataPoint {
  year: number;
  value: number;
  contributions: number;
}

export interface CalculationResults {
  chartData: ChartDataPoint[];
  finalValue: number;
  totalContributions: number;
  totalGains: number;
}

/**
 * Calculate investment growth over time
 * Uses correct logic: compound first, then add contribution
 * @param initialInvestment - Starting amount
 * @param monthlyContribution - Monthly contribution amount
 * @param annualReturn - Annual return percentage (e.g., 7 for 7%)
 * @param durationYears - Investment duration in years
 * @returns Calculation results with timeline data
 */
export function calculateInvestmentGrowth(
  initialInvestment: number,
  monthlyContribution: number,
  annualReturn: number,
  durationYears: number
): CalculationResults {
  const monthlyRate = annualReturn / 100 / 12;
  const totalMonths = durationYears * 12;
  
  let currentValue = initialInvestment;
  let totalContrib = initialInvestment;
  const data: ChartDataPoint[] = [
    { year: 0, value: initialInvestment, contributions: initialInvestment }
  ];
  
  // Calculate month by month
  for (let month = 1; month <= totalMonths; month++) {
    // Correct logic: Compound first, then add contribution
    currentValue = currentValue * (1 + monthlyRate) + monthlyContribution;
    totalContrib += monthlyContribution;
    
    // Record yearly data points
    if (month % 12 === 0 || month === totalMonths) {
      data.push({
        year: month / 12,
        value: Math.round(currentValue),
        contributions: totalContrib,
      });
    }
  }
  
  const finalValue = Math.round(currentValue);
  const totalGains = Math.round(finalValue - totalContrib);
  
  return {
    chartData: data,
    finalValue,
    totalContributions: totalContrib,
    totalGains,
  };
}

