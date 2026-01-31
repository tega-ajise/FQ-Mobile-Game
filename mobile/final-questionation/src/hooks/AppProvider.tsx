import { GameConfig, GameLoopState, LobbyDetails } from '@/types/types';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type TGameState = ((GameConfig | GameLoopState) & { stepIdx: number }) | undefined;

interface AppContextType {
  socket: Socket | null;
  lobbies: LobbyDetails[];
  waitingForJoiner: boolean;
  setWaitingForJoiner: React.Dispatch<React.SetStateAction<boolean>>;
  gameState: TGameState;
  setGameState: React.Dispatch<React.SetStateAction<TGameState>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [waitingForJoiner, setWaitingForJoiner] = useState<boolean>(true);
  const [lobbies, setLobbies] = useState<LobbyDetails[]>([]);
  const [gameState, setGameState] = useState<TGameState>();

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // will have to put this link into the EXPO environment variables later
    const socket = io('ws://localhost:8080', {
      reconnectionDelayMax: 10000,
    });
    socketRef.current = socket;

    socket.on('initLobbies', (allLobbies: LobbyDetails[]) => {
      setLobbies(allLobbies);
    });

    // seems like can only handle incoming events in the AppContext
    socket.on('lobbyAdded', (newLobby: LobbyDetails) => {
      console.log('Refreshing lobbies.');
      setLobbies((prev) => [...prev, newLobby]);
    });

    socket.on('nextStep', (gs: TGameState) => {
      setGameState(gs);
    });

    socket.on('eliminateItem', (value: string) => {
      setGameState((prev) => {
        if (!prev) return prev;
        const gs = prev as GameLoopState & { stepIdx: number };
        if (!gs.candidates) return prev;
        const newCandidates = gs.candidates.map((c) =>
          c.content === value ? { ...c, isEliminated: true } : c
        );

        return {
          ...gs,
          candidates: newCandidates,
          stepIdx:
            prev.stepIdx + 1 !== prev.roundQuestions?.length ? prev.stepIdx + 1 : prev.stepIdx,
        };
      });
    });

    return () => {
      socket.off('initLobbies');
      socket.off('lobbyAdded');
      socket.off('nextStep');
      socket.off('eliminateItem');
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        socket: socketRef.current,
        lobbies,
        waitingForJoiner,
        setWaitingForJoiner,
        gameState,
        setGameState,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('App context must be used within an App Provider');
  }
  return context;
};

export default AppProvider;
