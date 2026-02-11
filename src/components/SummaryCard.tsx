interface SummaryCardProps {
  label: string;
  value: string;
  highlight?: boolean;
}

const SummaryCard = ({ label, value, highlight = false }: SummaryCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 p-4 sm:p-5 space-y-1">
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className={`text-xl sm:text-2xl font-semibold break-words ${highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
        {value}
      </p>
    </div>
  );
};

export default SummaryCard;

