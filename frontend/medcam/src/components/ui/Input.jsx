import React from 'react'

export default function Input({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  valid,
  icon,
  required = false,
  disabled = false,
  hint,
}) {
  const borderClass = error
    ? 'border-[#EF4444] focus:ring-[#EF4444]'
    : valid
    ? 'border-[#4ADE80] focus:ring-[#4ADE80]'
    : 'border-[#E2E8F0] focus:ring-[#1E3A8A]'

  return (
    <div className="flex flex-col w-full">

      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-[#1E293B] mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input + icône */}
      <div className="relative">
        {icon && (
          <i className={`fa ${icon} absolute left-3 top-1/2 -translate-y-1/2 text-slate-400`} />
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full rounded-xl border px-4 py-2.5 text-[#1E293B]
            focus:outline-none focus:ring-2 transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            bg-white placeholder-slate-400
            ${icon ? 'pl-10' : ''}
            ${borderClass}
          `}
        />
      </div>

      {/* Erreur */}
      {error && (
        <p className="text-xs text-[#EF4444] mt-1">{error}</p>
      )}

      {/* Hint */}
      {hint && !error && (
        <p className="text-xs text-slate-400 mt-1">{hint}</p>
      )}

    </div>
  )
}