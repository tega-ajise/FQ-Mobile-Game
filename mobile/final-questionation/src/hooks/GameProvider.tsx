import { DEFAULT_ROUND_CONFIG } from '@/consts/config';
import { GameConfig } from '@/types/types';
import React, { createContext, useContext, useRef, useState } from 'react';

interface GameContextValue {
  playerRole: React.RefObject<string>;
  updateGameConfig: (config: Partial<GameConfig>) => void;
  globalGameConfig: GameConfig;
  setupCounts: { numberOfQuestions: number; numberOfCandidates: number };
  setSetupCounts: React.Dispatch<
    React.SetStateAction<{ numberOfQuestions: number; numberOfCandidates: number }>
  >;
}

const GameContext = createContext<GameContextValue>({} as GameContextValue);
const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const playerRole = useRef<string>('');

  const [setupCounts, setSetupCounts] = useState(DEFAULT_ROUND_CONFIG);
  // this is to be shared over the web socket
  const [globalGameConfig, setGlobalGameConfig] = useState<GameConfig>({});

  const updateGameConfig = (config: Partial<GameConfig>) => {
    setGlobalGameConfig((prev) => ({ ...prev, ...config }));
  };

  return (
    <GameContext.Provider
      value={{
        playerRole,
        updateGameConfig,
        globalGameConfig,
        setupCounts,
        setSetupCounts,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('Must be used within GameProvider');
  return ctx;
};

export default GameProvider;
