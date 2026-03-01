import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const steps = [
  'Categorizing transactions',
  'Detecting income patterns',
  'Identifying recurring obligations',
  'Calculating safe allocation',
];

const LoadingTransition = ({ onComplete }: Props) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    steps.forEach((_, i) => {
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i]);
      }, 400 * (i + 1));
    });

    setTimeout(() => setGenerating(true), 400 * (steps.length + 1));
    setTimeout(onComplete, 400 * (steps.length + 1) + 1000);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md">
        <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-foreground mb-6">Analyzing 847 transactions...</h2>

        <div className="space-y-3 text-left">
          {steps.map((step, i) => (
            <AnimatePresence key={i}>
              {completedSteps.includes(i) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{step}</span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}

          {generating && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm"
            >
              <span className="text-primary">→</span>
              <span className="text-foreground font-medium">Generating your recommendation...</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingTransition;
