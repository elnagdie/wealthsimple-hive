import { motion } from 'framer-motion';
import { PersonaData } from '@/data/personas';

interface Props {
  data: PersonaData;
}

/* Warm Wealthsimple-compatible palette — no blue */
const COLORS = [
  'hsl(118, 100%, 38%)',  /* green - primary */
  'hsl(35, 88%, 59%)',    /* amber */
  'hsl(20, 4%, 19%)',     /* charcoal */
  'hsl(340, 55%, 50%)',   /* warm rose */
  'hsl(30, 60%, 50%)',    /* burnt orange */
  'hsl(0, 0%, 60%)',      /* neutral gray */
  'hsl(10, 65%, 55%)',    /* coral */
  'hsl(50, 55%, 50%)',    /* olive gold */
  'hsl(0, 0%, 75%)',      /* light gray */
];

const SpendingBreakdown = ({ data }: Props) => {
  return (
    <motion.div
      key={data.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <h2 className="text-xl font-semibold text-foreground mb-4">Spending Breakdown</h2>

      {/* Stacked bar */}
      <div className="flex rounded-lg overflow-hidden h-8 mb-6">
        {data.spending.map((cat, i) => (
          <div
            key={cat.name}
            className="h-full transition-all"
            style={{ width: `${cat.percent}%`, backgroundColor: COLORS[i % COLORS.length] }}
            title={`${cat.name}: ${cat.percent}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-3">
        {data.spending.map((cat, i) => (
          <div key={cat.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-foreground">{cat.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground tabular-nums">${cat.amount.toLocaleString()} ({cat.percent}%)</span>
              {cat.flag && (
                <span className="text-xs text-destructive font-medium">{cat.flag}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SpendingBreakdown;
