import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PersonaType, PersonaData, priyaData, marcusData } from '@/data/personas';

interface PersonaContextValue {
  persona: PersonaType;
  setPersona: (p: PersonaType) => void;
  data: PersonaData;
}

const PersonaContext = createContext<PersonaContextValue | null>(null);

export const PersonaProvider = ({ children, initial = 'priya' }: { children: ReactNode; initial?: PersonaType }) => {
  const [persona, setPersona] = useState<PersonaType>(initial);
  const data = persona === 'priya' ? priyaData : marcusData;

  return (
    <PersonaContext.Provider value={{ persona, setPersona, data }}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error('usePersona must be used within PersonaProvider');
  return ctx;
};
