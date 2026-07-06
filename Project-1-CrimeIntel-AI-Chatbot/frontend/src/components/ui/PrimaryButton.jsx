function PrimaryButton({ children, variant = "primary", className = "" }) {
  const styles = {
    primary:
      "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
    outline:
      "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20",
    ghost:
      "border border-white/10 bg-white/5 text-white hover:bg-white/10",
  }

  return (
    <button
      className={`rounded-2xl px-6 py-4 font-bold transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default PrimaryButton