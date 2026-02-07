import React, { createContext, useContext } from 'react';
import { useDatabase, type UseDatabase } from '../hooks/useDatabase';

const DatabaseContext = createContext<UseDatabase | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const dbValue = useDatabase();

  return (
    <DatabaseContext.Provider value={dbValue}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabaseContext(): UseDatabase {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabaseContext must be used within DatabaseProvider');
  }
  return context;
}
