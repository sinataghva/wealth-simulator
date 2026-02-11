import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface ChartDataPoint {
  year: number;
  value: number;
  contributions: number;
}

interface InvestmentChartProps {
  data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length >= 2) {
    const portfolioValue = payload.find((p: any) => p.dataKey === 'value')?.value || 0;
    const contributions = payload.find((p: any) => p.dataKey === 'contributions')?.value || 0;
    const interestGains = portfolioValue - contributions;

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 shadow-lg min-w-[180px]">
        <p className="text-gray-900 dark:text-white font-semibold text-sm mb-2">Year {Math.round(label)}</p>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400 text-xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              Portfolio value
            </span>
            <span className="text-gray-900 dark:text-white font-medium text-sm">{formatCurrency(portfolioValue)}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400 text-xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
              Contributions
            </span>
            <span className="text-gray-900 dark:text-white font-medium text-sm">{formatCurrency(contributions)}</span>
          </div>
          <div className="flex justify-between items-center gap-4 pt-1 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400 text-xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-green-500 opacity-60"></span>
              Interest gains
            </span>
            <span className="text-green-600 dark:text-green-400 font-medium text-sm">{formatCurrency(interestGains)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4">
      <div className="flex items-center gap-2">
        <span className="w-3 h-0.5 bg-blue-500 rounded"></span>
        <span className="text-gray-600 dark:text-gray-400 text-xs">Total portfolio value</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-0.5 bg-gray-400 rounded"></span>
        <span className="text-gray-600 dark:text-gray-400 text-xs">Total contributions</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm bg-green-500 opacity-60"></span>
        <span className="text-gray-600 dark:text-gray-400 text-xs">Interest gains</span>
      </div>
    </div>
  );
};

const InvestmentChart = ({ data }: InvestmentChartProps) => {
  return (
    <div className="w-full min-w-0">
      <div className="h-64 sm:h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorGains" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
              vertical={false}
            />
            <XAxis 
              dataKey="year" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => Math.round(value).toString()}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => {
                // Format with fr-FR locale
                return new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value);
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#colorGains)"
            />
            <Area
              type="monotone"
              dataKey="contributions"
              stroke="#9ca3af"
              strokeWidth={2}
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend />
    </div>
  );
};

export default InvestmentChart;

