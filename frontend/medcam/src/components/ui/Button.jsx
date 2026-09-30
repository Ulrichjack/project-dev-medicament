import React from 'react'

const variants = {
  primary:   'bg-[#1E3A8A] hover:bg-[#162d6e] text-white',
  secondary: 'bg-[#38BDF8] hover:bg-[#29aee8] text-white',
  success:   'bg-[#4ADE80] hover:bg-[#3bce70] text-white',
  danger:    'bg-[#EF4444] hover:bg-[#dc2626] text-white',
  outline:   'border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#F0F4FF] bg-transparent',
  ghost:     'text-[#1E3A8A] hover:bg-[#F0F4FF] bg-transparent',
}

const sizes = {
  sm: 'py-1.5 px-3 text-sm',
  md: 'py-2.5 px-5 text-base',
  lg: 'py-3 px-8 text-lg',
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
)

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
  className = '',
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center
        font-semibold rounded-xl transition-all
        focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:ring-offset-2
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}