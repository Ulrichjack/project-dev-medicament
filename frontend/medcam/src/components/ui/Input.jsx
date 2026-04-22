"use client";

import { useState } from "react";

export default function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  valid = false,
  icon,
  required = false,
  disabled = false,
  name,
  id,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const borderColor = error
    ? "border-[#E74C3C] focus:ring-[#E74C3C]"
    : valid
    ? "border-[#27AE60] focus:ring-[#27AE60]"
    : "border-[#E8ECF0] focus:ring-[#2C5F8D]";

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id || name}
          className="text-sm font-semibold text-[#2C3E50]"
        >
          {label}
          {required && <span className="text-[#E74C3C] ml-1">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative w-full">
        {/* Icône gauche */}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7F8C8D] text-sm pointer-events-none">
            <i className={`fa-solid fa-${icon}`} />
          </span>
        )}

        {/* Champ */}
        <input
          id={id || name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={[
            "w-full rounded-[10px] border bg-white text-[#2C3E50] text-sm",
            "px-4 py-3 outline-none transition-all duration-200",
            "focus:ring-2 focus:ring-offset-0",
            "placeholder:text-[#B0BEC5]",
            icon ? "pl-10" : "",
            isPassword ? "pr-10" : "",
            disabled
              ? "bg-[#F5F7FA] text-[#B0BEC5] cursor-not-allowed"
              : "",
            borderColor,
          ]
            .filter(Boolean)
            .join(" ")}
        />

        {/* Toggle password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7F8C8D] hover:text-[#2C5F8D] transition-colors"
            tabIndex={-1}
          >
            <i className={`fa-solid fa-${showPassword ? "eye-slash" : "eye"}`} />
          </button>
        )}

        {/* Icône valid */}
        {valid && !error && !isPassword && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#27AE60]">
            <i className="fa-solid fa-circle-check" />
          </span>
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <span className="text-xs text-[#E74C3C] flex items-center gap-1">
          <i className="fa-solid fa-triangle-exclamation" />
          {error}
        </span>
      )}
    </div>
  );
}