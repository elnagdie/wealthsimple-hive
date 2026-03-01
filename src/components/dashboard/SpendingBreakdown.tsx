import { motion } from 'framer-motion';
import { PersonaData } from '@/data/personas';

interface Props {
  data: PersonaData;
}

const COLORS = [
  'hsl(145, 63%, 49%)',
  'hsl(33, 91%, 55%)',
  'hsl(220, 60%, 55%)',
  'hsl(340, 65%, 55%)',
  'hsl(280, 50%, 55%)',
  'hsl(180, 50%, 45%)',
  'hsl(10, 65%, 55%)',
  'hsl(50, 60%, 50%)',
  'hsl(220, 14%, 70%)',
];

const SpendingBreakdown = ({ data }: Props) => {
  return (
    <motion.div
      key={data.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">Spending Breakdown</h2>

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
