import { usePersona } from '@/context/PersonaContext';
import { motion } from 'framer-motion';

const HeaderBar = () => {
  const { persona, setPersona, data } = usePersona();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-[1080px] mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Wordmark */}
        <div>
          <h1 className="text-lg text-foreground leading-tight">
            <span className="font-normal">wealthsimple</span>
            <span className="text-border mx-2">|</span>
            <span className="font-semibold">Hive</span>
          </h1>
          <p className="text-[11px] text-muted-foreground -mt-0.5">Your AI financial co-pilot</p>
        </div>

        {/* Center: Persona Toggle */}
        <div className="flex bg-secondary rounded-lg p-1">
          {(['priya', 'marcus'] as const).map((p) => {
            const label = p === 'priya' ? 'Priya S. — UGC Creator' : 'Marcus R. — Software Dev';
            const isActive = persona === p;
            return (
              <button
                key={p}
                onClick={() => setPersona(p)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="persona-tab"
                    className="absolute inset-0 bg-primary rounded-md"
                    transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Persona badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-foreground">
            {data.name[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{data.name}</p>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
              data.incomeType === 'variable'
                ? 'bg-warning/20 text-warning'
                : 'bg-primary/20 text-primary'
            }`}>
              {data.incomeLabel}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
