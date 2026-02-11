import { useState, useMemo } from 'react';
import InputField from '@/components/InputField';
import InvestmentChart from '@/components/InvestmentChart';
import SummaryCard from '@/components/SummaryCard';
import { calculateInvestmentGrowth } from '@/lib/calculator';
import { formatCurrency, generateSummarySentence } from '@/lib/utils';

const Index = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [duration, setDuration] = useState(20);
  const [annualReturn, setAnnualReturn] = useState(7);

  const { chartData, finalValue, totalContributions, totalGains } = useMemo(() => {
    return calculateInvestmentGrowth(
      initialInvestment,
      monthlyContribution,
      annualReturn,
      duration
    );
  }, [initialInvestment, monthlyContribution, duration, annualReturn]);

  const summarySentence = generateSummarySentence(
    { finalValue, totalContributions, totalGains },
    'EUR'
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-12">
      <div className="max-w-7xl mx-auto min-w-0">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
          Wealth Simulator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-4 min-w-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 lg:p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Investment Parameters
              </h2>
              
              <div className="space-y-5">
                <InputField
                  label="Initial Investment"
                  value={initialInvestment}
                  onChange={setInitialInvestment}
                  prefix="€"
                />
                
                <InputField
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  onChange={setMonthlyContribution}
                  prefix="€"
                />
                
                <InputField
                  label="Investment Duration"
                  value={duration}
                  onChange={setDuration}
                  suffix="years"
                />
                
                <InputField
                  label="Annual Return"
                  value={annualReturn}
                  onChange={setAnnualReturn}
                  suffix="%"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Chart and Summary */}
          <div className="lg:col-span-8 space-y-6 min-w-0">
            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 lg:p-8 overflow-hidden">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Portfolio Growth
              </h2>
              <InvestmentChart data={chartData} />
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 lg:p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Summary
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {summarySentence}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <SummaryCard
                  label="Final Portfolio Value"
                  value={formatCurrency(finalValue)}
                  highlight
                />
                <SummaryCard
                  label="Total Contributions"
                  value={formatCurrency(totalContributions)}
                />
                <SummaryCard
                  label="Total Gains"
                  value={formatCurrency(totalGains)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

