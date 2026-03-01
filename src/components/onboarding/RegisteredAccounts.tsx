import { useState } from 'react';
import { PersonaType, priyaData, marcusData } from '@/data/personas';
import { Check, Info } from 'lucide-react';

interface Props {
  persona: PersonaType;
  onLaunch: () => void;
}

const RegisteredAccounts = ({ persona, onLaunch }: Props) => {
  const d = persona === 'priya' ? priyaData : marcusData;
  const [tfsaRoom, setTfsaRoom] = useState(d.tfsaRoom);
  const [rrspRoom, setRrspRoom] = useState(d.rrspRoom);
  const [ownsHome, setOwnsHome] = useState(d.ownsHome);
  const [province, setProvince] = useState(d.province);
  const [emergencyTarget, setEmergencyTarget] = useState(d.emergencyTarget);

  const provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-foreground mb-2">Help me track your contribution room</h1>
      <p className="text-muted-foreground mb-8">I can see your Wealthsimple accounts automatically. For accounts at other banks, I need your help.</p>

      {/* Auto-detected accounts */}
      <div className="space-y-3 mb-8">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Auto-detected</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-primary">
            <Check className="w-4 h-4" />
            <span>Wealthsimple TFSA — {d.tfsaBalance}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary">
            <Check className="w-4 h-4" />
            <span>Wealthsimple RRSP — {d.rrspBalance}</span>
          </div>
          {d.hasFhsa && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <Check className="w-4 h-4" />
              <span>Wealthsimple FHSA — {d.fhsaBalance}</span>
            </div>
          )}
        </div>
      </div>

      {/* Editable fields */}
      <div className="space-y-5 mb-8">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your input needed</h3>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Total TFSA contribution room remaining for 2026
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="text"
              value={tfsaRoom}
              onChange={(e) => setTfsaRoom(e.target.value)}
              className="w-full pl-7 pr-3 py-2.5 border border-input rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Find this at CRA My Account → TFSA details</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Total RRSP contribution room for 2026
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="text"
              value={rrspRoom}
              onChange={(e) => setRrspRoom(e.target.value)}
              className="w-full pl-7 pr-3 py-2.5 border border-input rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">From your Notice of Assessment or CRA My Account</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Do you own a home?</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOwnsHome(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!ownsHome ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              No
            </button>
            <button
              onClick={() => setOwnsHome(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${ownsHome ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              Yes
            </button>
            <span className="text-xs text-muted-foreground ml-2">
              {ownsHome ? 'FHSA: Not eligible (homeowners)' : 'FHSA eligible ✓'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Province</label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full px-3 py-2.5 border border-input rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {provinces.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Emergency fund target</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="text"
              value={emergencyTarget}
              onChange={(e) => setEmergencyTarget(e.target.value)}
              className="w-full pl-7 pr-3 py-2.5 border border-input rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">3 months × your average expenses</p>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-info/30 border border-info rounded-lg p-4 mb-8">
        <div className="flex gap-2">
          <Info className="w-4 h-4 text-info-foreground mt-0.5 shrink-0" />
          <p className="text-sm text-info-foreground">
            <strong>Why do I need this?</strong> I can see your Wealthsimple accounts, but TFSA and RRSP room is tracked by CRA across ALL your institutions. If you have accounts at other banks, your total room may be different from what I detect here. Over-contributing triggers a 1%/month penalty — I want to protect you from that.
          </p>
        </div>
      </div>

      <button
        onClick={onLaunch}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg"
      >
        Launch Co-Pilot →
      </button>
    </div>
  );
};

export default RegisteredAccounts;
