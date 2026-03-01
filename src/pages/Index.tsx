import { useState } from 'react';
import { PersonaType } from '@/data/personas';
import { PersonaProvider } from '@/context/PersonaContext';
import Onboarding from '@/pages/Onboarding';
import Dashboard from '@/pages/Dashboard';

const Index = () => {
  const [phase, setPhase] = useState<'onboarding' | 'dashboard'>('onboarding');
  const [persona, setPersona] = useState<PersonaType>('priya');

  const handleOnboardingComplete = (p: PersonaType) => {
    setPersona(p);
    setPhase('dashboard');
  };

  if (phase === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <PersonaProvider initial={persona}>
      <Dashboard />
    </PersonaProvider>
  );
};

export default Index;
