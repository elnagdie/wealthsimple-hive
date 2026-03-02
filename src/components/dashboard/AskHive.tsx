import { useState } from 'react';
import { Send, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import type { PersonaData } from '@/data/personas';

interface AskHiveProps {
  data: PersonaData;
}

const AskHive = ({ data }: AskHiveProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();

  const handleChipClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      toast({
        title: 'Prototype Mode',
        description: 'In production, you can ask any question. This prototype demonstrates pre-loaded examples.',
      });
      setInputValue('');
    }
  };

  const activeResponse = selectedIndex !== null ? data.askHiveChips[selectedIndex] : null;

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Hive anything about your money..."
          className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
          <Send size={18} />
        </button>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {data.askHiveChips.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleChipClick(i)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              selectedIndex === i
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {chip.question}
          </button>
        ))}
      </div>

      {/* Response */}
      <AnimatePresence mode="wait">
        {activeResponse && (
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="ml-2 rounded-lg border-l-4 border-l-primary bg-card p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Hexagon size={14} />
              Hive
            </div>
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground/90">
              {activeResponse.response}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AskHive;
