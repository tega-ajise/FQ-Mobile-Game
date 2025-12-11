import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext({});
const PLAYER_ROLE = 'Curator';
const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTurnRole, setCurrentTurnRole] = useState<string>(PLAYER_ROLE); // should be initialized to whether player is curator or not

  const handleViewChange = () => {
    setCurrentTurnRole((prev) => {
      return prev === 'Curator' ? 'Navigator' : 'Curator';
    });
  };

  return (
    <GameContext.Provider value={{ currentTurnRole, handleViewChange }}>
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
