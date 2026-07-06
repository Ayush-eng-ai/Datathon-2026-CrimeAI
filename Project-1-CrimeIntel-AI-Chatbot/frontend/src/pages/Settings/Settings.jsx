import PageHeader from "../../components/ui/PageHeader"
import GlassCard from "../../components/ui/GlassCard"
import PrimaryButton from "../../components/ui/PrimaryButton"

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader
        label="System Configuration"
        title="Settings"
        description="Manage language, role access, security, and application preferences."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h3 className="text-xl font-bold text-white">
            User Preferences
          </h3>

          <div className="mt-6 space-y-4">
            <select className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-white">
              <option>English</option>
              <option>Kannada</option>
            </select>

            <select className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-white">
              <option>Officer</option>
              <option>Admin</option>
              <option>Analyst</option>
            </select>

            <PrimaryButton>
              Save Preferences
            </PrimaryButton>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold text-white">
            Security
          </h3>

          <div className="mt-6 space-y-4">
            <button className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-left text-white">
              Change Password
            </button>

            <button className="w-full rounded-2xl border border-white/10 bg-slate-950 p-4 text-left text-white">
              Enable Two Factor Authentication
            </button>

            <button className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-left text-red-300">
              Logout
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default Settings