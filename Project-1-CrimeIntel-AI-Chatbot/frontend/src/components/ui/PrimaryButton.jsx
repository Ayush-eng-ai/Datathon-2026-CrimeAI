function PrimaryButton({
  children,
  className = "",
  variant = "primary",
  onClick,
  disabled = false,
}) {
  const baseClass =
    "rounded-2xl px-7 py-4 font-bold transition disabled:cursor-not-allowed disabled:opacity-60"

  const variants = {
    primary: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
    outline:
      "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default PrimaryButton