export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const baseStyle = "font-bold rounded-xl transition-all flex items-center justify-center";
  const variants = {
    primary: "bg-primary text-white hover:bg-[#1E4870]",
    outline: "border-2 border-primary text-primary hover:bg-blue-50",
    danger: "bg-danger text-white hover:bg-red-700"
  };
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}