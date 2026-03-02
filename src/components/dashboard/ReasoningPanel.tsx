import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PersonaData } from '@/data/personas';

interface Props {
  data: PersonaData;
}

const ReasoningPanel = ({ data }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm font-medium text-foreground underline hover:text-primary transition-colors"
      >
        See full reasoning
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">The Calculation Chain</h3>
                <pre className="text-[13px] text-foreground font-mono whitespace-pre-wrap bg-secondary rounded-lg p-4">
                  {data.calculationChain}
                </pre>
              </div>

              <div className="rounded-lg p-5 border-l-[3px] border-l-warning" style={{ backgroundColor: '#FFF9ED' }}>
                <h3 className="text-sm font-medium text-warning mb-3">What I can't see</h3>
                <ul className="space-y-1.5">
                  {data.cantSee.map((item, i) => (
                    <li key={i} className="text-sm text-foreground">• {item}</li>
                  ))}
                </ul>
                <button className="mt-3 text-sm font-medium text-foreground underline hover:text-primary transition-colors">
                  Update my situation →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReasoningPanel;
