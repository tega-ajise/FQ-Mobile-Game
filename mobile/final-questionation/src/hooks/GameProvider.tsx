import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext({});
const PLAYER_ROLE = 'curator';
const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTurnRole, setCurrentTurnRole] = useState<string>(PLAYER_ROLE); // should be initialized to whether player is curator or not
  const [playerRole, setPlayerRole] = useState<string>('');

  const handleViewChange = () => {
    setCurrentTurnRole((prev) => {
      return prev === 'curator' ? 'navigator' : 'curator';
    });
  };

  return (
    <GameContext.Provider value={{ currentTurnRole, handleViewChange, playerRole, setPlayerRole }}>
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
