import React, { createContext, useContext, useState } from 'react';

interface GameConfig {
  lobbyName?: string;
  roundQuestions?: string[];
  candidates?: string[];
}

interface GameContextValue {
  currentTurnRole: string;
  handleViewChange: () => void;
  playerRole: string;
  setPlayerRole: React.Dispatch<React.SetStateAction<string>>;
  updateGameConfig: (config: Partial<GameConfig>) => void;
  globalGameConfig: GameConfig;
}

const GameContext = createContext<GameContextValue>({} as GameContextValue);
const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTurnRole, setCurrentTurnRole] = useState<string>('curator'); // should be initialized to whether player is curator or not
  const [playerRole, setPlayerRole] = useState<string>('');

  // this is to be shared over the web socket
  const [globalGameConfig, setGlobalGameConfig] = useState<GameConfig>();

  const handleViewChange = () => {
    setCurrentTurnRole((prev) => {
      return prev === 'curator' ? 'navigator' : 'curator';
    });
  };

  const updateGameConfig = (config: Partial<GameConfig>) => {
    setGlobalGameConfig((prev) => ({ ...prev, ...config }));
  };

  return (
    <GameContext.Provider
      value={{
        currentTurnRole,
        handleViewChange,
        playerRole,
        setPlayerRole,
        updateGameConfig,
        globalGameConfig,
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
