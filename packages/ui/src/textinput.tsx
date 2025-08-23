"use client";

export const TextInput = ({
  maxLength,
  type,
  placeholder,
  onChange,
  label,
  className = "",
}: {
  maxLength?: number;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
  // todo : remove increament decreament from text field
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <input
        maxLength={maxLength}
        onChange={(e) => {
          
          onChange(e.target.value);
        }}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
};
