"use client";
export const Select = ({
  options,
  onSelect,
  label,
  className = "",
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
  label?: string;
  className?: string;
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      >
        {options.map((option) => (
          <option key={option.key} value={option.key} className="bg-gray-800 text-gray-100">
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};
