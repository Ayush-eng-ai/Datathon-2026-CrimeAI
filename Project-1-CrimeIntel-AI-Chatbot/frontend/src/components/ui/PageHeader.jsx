import GlassCard from "./GlassCard"

function PageHeader({ label, title, description }) {
  return (
    <GlassCard>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        {label}
      </p>
      <h2 className="mt-2 text-3xl font-black text-white">{title}</h2>
      <p className="mt-2 text-slate-400">{description}</p>
    </GlassCard>
  )
}

export default PageHeader