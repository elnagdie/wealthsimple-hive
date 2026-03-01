import { useState } from 'react';
import { motion } from 'framer-motion';
import { PersonaData } from '@/data/personas';

interface Props {
  data: PersonaData;
}

const ScenarioExplorer = ({ data }: Props) => {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);

  const toggleScenario = (idx: number) => {
    setActiveScenario(activeScenario === idx ? null : idx);
  };

  const active = activeScenario !== null ? data.scenarios[activeScenario] : null;

  return (
    <motion.div
      key={data.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <h2 className="text-lg font-semibold text-foreground mb-1">Scenario Explorer</h2>
      <p className="text-sm text-muted-foreground mb-4">What changes if...</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {data.scenarios.map((scenario, idx) => (
          <button
            key={idx}
            onClick={() => toggleScenario(idx)}
            className={`text-left p-4 rounded-lg border-2 transition-all ${
              activeScenario === idx
                ? scenario.isPositive
                  ? 'border-primary bg-primary/5'
                  : 'border-warning bg-warning/5'
                : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{scenario.title}</span>
              <div className={`w-10 h-5 rounded-full flex items-center transition-colors ${
                activeScenario === idx ? 'bg-primary' : 'bg-border'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-card shadow-sm transition-transform ${
                  activeScenario === idx ? 'translate-x-5' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
            {activeScenario === idx && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-2xl font-bold text-foreground mt-2">
                  ${scenario.newAmount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">safe to allocate</p>
              </motion.div>
            )}
          </button>
        ))}
      </div>

      {active && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg text-sm ${
            active.isPositive ? 'bg-primary/5 text-foreground' : 'bg-warning/10 text-foreground'
          }`}
        >
          {active.note}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ScenarioExplorer;
