"use client";

const variants = {
  primary: {
    base: "text-white border-transparent",
    normal: "bg-[#2C5F8D] hover:bg-[#1e4a73]",
    disabled: "bg-[#B0BEC5] cursor-not-allowed opacity-60",
  },
  success: {
    base: "text-white border-transparent",
    normal: "bg-[#27AE60] hover:bg-[#1e8449]",
    disabled: "bg-[#B0BEC5] cursor-not-allowed opacity-60",
  },
  danger: {
    base: "text-white border-transparent",
    normal: "bg-[#E74C3C] hover:bg-[#c0392b]",
    disabled: "bg-[#B0BEC5] cursor-not-allowed opacity-60",
  },
  outline: {
    base: "text-[#2C5F8D] border-[#2C5F8D] bg-transparent",
    normal: "hover:bg-[#2C5F8D] hover:text-white",
    disabled: "border-[#B0BEC5] text-[#B0BEC5] cursor-not-allowed opacity-60",
  },
  ghost: {
    base: "text-[#2C3E50] border-transparent bg-transparent",
    normal: "hover:bg-[#F5F7FA]",
    disabled: "text-[#B0BEC5] cursor-not-allowed opacity-60",
  },
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) {
  const isDisabled = disabled || loading;
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;

  const classes = [
    "inline-flex items-center justify-center gap-2",
    "font-semibold rounded-[10px] border transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-[#2C5F8D] focus:ring-offset-2",
    v.base,
    isDisabled ? v.disabled : v.normal,
    loading ? "cursor-wait" : "",
    s,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={classes}
    >
      {loading && (
        <span
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}