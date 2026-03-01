import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonaType } from '@/data/personas';
import IncomeSelection from '@/components/onboarding/IncomeSelection';
import ConnectAccounts from '@/components/onboarding/ConnectAccounts';
import RegisteredAccounts from '@/components/onboarding/RegisteredAccounts';
import LoadingTransition from '@/components/onboarding/LoadingTransition';

interface OnboardingProps {
  onComplete: (persona: PersonaType) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<PersonaType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleIncomeSelect = (type: PersonaType) => {
    setPersona(type);
  };

  const handleLaunch = () => {
    setLoading(true);
  };

  const handleLoadingComplete = () => {
    if (persona) onComplete(persona);
  };

  if (loading) {
    return <LoadingTransition onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="w-full max-w-[600px] mx-auto pt-8 px-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                s <= step ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">Step {step} of 3</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[600px]"
            >
              <IncomeSelection
                selected={persona}
                onSelect={handleIncomeSelect}
                onContinue={() => setStep(2)}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[600px]"
            >
              <ConnectAccounts onContinue={() => setStep(3)} />
            </motion.div>
          )}
          {step === 3 && persona && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[700px]"
            >
              <RegisteredAccounts persona={persona} onLaunch={handleLaunch} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
