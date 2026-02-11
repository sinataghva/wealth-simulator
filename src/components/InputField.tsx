interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  prefix?: string;
}

const InputField = ({ label, value, onChange, suffix, prefix }: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 min-w-0 px-3 py-2.5 sm:py-2 border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white text-base sm:text-lg focus:outline-none focus:ring-0 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
        />
        {(prefix || suffix) && (
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {prefix || suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;

