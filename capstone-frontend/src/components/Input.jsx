import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block playfair-display font-bold text-sm uppercase tracking-[0.2em] text-gray-700"
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none transition-all placeholder:text-gray-400 lora"
      />
    </div>
  );
};

export default Input;