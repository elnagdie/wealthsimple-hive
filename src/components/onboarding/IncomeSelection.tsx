import { PersonaType } from '@/data/personas';
import { Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Props {
  selected: PersonaType | null;
  onSelect: (t: PersonaType) => void;
  onContinue: () => void;
}

const IncomeSelection = ({ selected, onSelect, onContinue }: Props) => {
  const cards: { type: PersonaType; icon: React.ReactNode; title: string; desc: string; sub: string }[] = [
    {
      type: 'marcus',
      icon: <Calendar className="w-8 h-8" />,
      title: 'Steady paycheque',
      desc: 'Salary, regular bi-weekly or monthly pay',
      sub: 'I get paid the same amount on a predictable schedule',
    },
    {
      type: 'priya',
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Variable / freelance income',
      desc: 'Freelance, contract, creator, gig, or commission-based',
      sub: 'My income changes month to month',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-foreground mb-2">How do you get paid?</h1>
      <p className="text-muted-foreground mb-8">Let's understand your income. This helps your Co-Pilot adapt to your financial rhythm.</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {cards.map((c) => (
          <button
            key={c.type}
            onClick={() => onSelect(c.type)}
            className={`relative text-left p-6 rounded-xl border-2 transition-all duration-200 ${
              selected === c.type
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            {selected === c.type && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-primary-foreground" />
              </motion.div>
            )}
            <div className="text-foreground mb-3">{c.icon}</div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{c.title}</h3>
            <p className="text-sm text-foreground/80 mb-2">{c.desc}</p>
            <p className="text-xs text-muted-foreground">{c.sub}</p>
          </button>
        ))}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={onContinue}
            className="w-full py-3 bg-primary text-primary-foreground rounded-[10px] font-semibold hover:opacity-90 transition-opacity"
          >
            Continue →
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default IncomeSelection;
